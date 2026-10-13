#!/usr/bin/env node
// Rewrites the generated blocks of the markdown pages from ws_surface.json.
//
// A block is delimited by
//   <!-- ws:begin fields channel=book -->
//   <!-- ws:end -->
// and everything between the two markers is replaced. Text outside the
// markers is never touched. `channel=<name>` describes the messages of a
// public channel, `filter=<name>` the messages a private filter emits.
//
// Usage: node scripts/ws-docs.js [--check]
//   --check  change nothing; exit 1 if any page is out of date

'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const surface = JSON.parse(fs.readFileSync(path.join(root, 'ws_surface.json'), 'utf8'));

const BLOCK = /(<!-- ws:begin (\w+)((?: [\w-]+=[\w-]+)*) -->\n)[\s\S]*?(<!-- ws:end -->)/g;

function parseArgs(text) {
  return Object.fromEntries(text.trim().split(/\s+/).filter(Boolean).map((pair) => pair.split('=')));
}

function messagesFor(args, where) {
  let messages;
  if (args.channel) {
    messages = surface.messages.filter((m) => m.channel === args.channel);
  } else if (args.filter) {
    const filter = surface.filters.find((f) => f.name === args.filter);
    if (!filter) throw new Error(`${where}: no filter named ${args.filter}`);
    messages = filter.emits.map((event) => surface.messages.find((m) => m.channel === 'user' && m.event === event));
  } else {
    throw new Error(`${where}: a fields block needs channel=<name> or filter=<name>`);
  }

  if (messages.length === 0 || messages.some((m) => !m)) {
    throw new Error(`${where}: no messages for ${JSON.stringify(args)}`);
  }
  for (const message of messages) {
    if (!message.fields) throw new Error(`${where}: ${message.id} has no recorded fields`);
  }
  return messages;
}

// Fields are listed in the order the server writes them. A field only some
// messages carry goes after the field that precedes it in the first that does.
function mergedPaths(messages) {
  const merged = [];
  for (const message of messages) {
    let insertAt = 0;
    for (const { path: p } of message.fields) {
      const at = merged.indexOf(p);
      if (at >= 0) {
        insertAt = at + 1;
        continue;
      }
      merged.splice(insertAt, 0, p);
      insertAt++;
    }
  }
  return merged;
}

function cell(text) {
  return String(text).replace(/\|/g, '\\|');
}

function oneOf(values) {
  const quoted = values.map((v) => `\`${v}\``);
  return quoted.length === 1 ? quoted[0] : `${quoted.slice(0, -1).join(', ')} or ${quoted[quoted.length - 1]}`;
}

function fieldsTable(messages, where) {
  const field = (m, p) => m.fields.find((f) => f.path === p);
  const paths = mergedPaths(messages);

  const rows = paths.map((p) => {
    const present = messages.filter((m) => field(m, p));
    let { description } = field(present[0], p);
    for (const m of present) {
      if (field(m, p).description !== description) {
        throw new Error(`${where}: ${p} is described differently by ${present[0].id} and ${m.id}`);
      }
    }
    if (p === 'e') description = `${description}, ${oneOf(messages.map((m) => m.event))}`;
    // One event may only ever have shown a value and another only null.
    const types = [...new Set(present.flatMap((m) => field(m, p).type.split('|')))].sort();
    const type = types.join(' or ');
    const events = present.length === messages.length ? null : present.map((m) => `\`${m.event}\``).join(', ');
    return { p, type, description, events };
  });

  // Only worth a column when some field is missing from some event.
  const withEvents = rows.some((r) => r.events);
  const header = withEvents ? '| Field | Type | Description | Events |\n|---|---|---|---|' : '| Field | Type | Description |\n|---|---|---|';

  const lines = rows.map((r) => {
    const columns = [`\`${r.p}\``, cell(r.type), cell(r.description)];
    if (withEvents) columns.push(r.events || 'all');
    return `| ${columns.join(' | ')} |`;
  });

  return `${header}\n${lines.join('\n')}\n`;
}

function render(kind, args, where) {
  if (kind === 'fields') return fieldsTable(messagesFor(args, where), where);
  throw new Error(`${where}: unknown block kind ${kind}`);
}

function main() {
  const check = process.argv.includes('--check');
  const pages = fs.readdirSync(root).filter((name) => name.endsWith('.md'));

  const stale = [];
  const covered = { channel: new Set(), filter: new Set() };

  for (const page of pages) {
    const file = path.join(root, page);
    const before = fs.readFileSync(file, 'utf8');
    const after = before.replace(BLOCK, (match, begin, kind, argText, end) => {
      const args = parseArgs(argText);
      if (args.channel) covered.channel.add(args.channel);
      if (args.filter) covered.filter.add(args.filter);
      return begin + render(kind, args, `${page} ${kind}${argText}`) + end;
    });

    if (after === before) continue;
    stale.push(page);
    if (!check) fs.writeFileSync(file, after);
  }

  const uncovered = [
    ...surface.channels.filter((c) => c.name !== 'user' && !covered.channel.has(c.name)).map((c) => `channel=${c.name}`),
    ...surface.filters.filter((f) => !covered.filter.has(f.name)).map((f) => `filter=${f.name}`),
  ];
  if (uncovered.length > 0) {
    throw new Error(`no page has a generated block for: ${uncovered.join(', ')}`);
  }

  if (stale.length === 0) {
    console.log('every generated block is up to date');
    return;
  }
  if (check) {
    console.error(`out of date, run \`npm run ws-docs\`: ${stale.join(', ')}`);
    process.exit(1);
  }
  console.log(`rewrote ${stale.join(', ')}`);
}

try {
  main();
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
