# MAX Exchange WebSocket API

## Introduction

Official documentation for the new redesign MAX Exchange websocket service

__Endpoint__: `wss://max-stream.maicoin.com/ws`

__Important note__
> * price and volume should be string
> * timestamp and depth should be number

## Keep connection

You need to use ping frame to keep connection with server. If server doesn't receive your ping for 130 seconds, the connection will be closed by server side. Some libraries will do this for you, so please check your library first.

```javascript
const WebSocket = require('ws');
const url = "wss://max-stream.maicoin.com/ws"
const ws = new WebSocket(url);

ws.on('open', function open() {
  setInterval(() => {
    ws.ping("test")
  }, 30000);
})
ws.on('pong', function incoming(data) {
  // it will show "server pong test" on the screen
  console.log('server pong', data.toString());
});
```

## Response key alias
We use short keys to reduce response size, please check out mappings below.

| abbr | meaning            | comment             |
| ---- | ------------------ | ------------------- |
| `e`  | `event`            | 
| `E`  | `errors`           | 
| `c`  | `channel`          | 
| `i`  | `id`               | 
| `s`  | `subscription`     | 
| `T`  | `at`               | // or `created_at` |
| `TU` | `updated_at`       |
| `ST` | `startTime`        | 
| `ET` | `endTime`          | 
| `k`  | `kline`            | 
| `a`  | `asks`             | 
| `b`  | `bids`             | 
| `M`  | `market`           | 
| `ms` | `markets`          |
| `m`  | `maker`            | 
| `p`  | `price`            | 
| `v`  | `volume`           | 
| `O`  | `open`             | 
| `C`  | `close`            | 
| `H`  | `high`             | 
| `L`  | `low`              | 
| `V`  | `volume in BTC`    |
| `tk` | `ticker`           | 
| `o`  | `orders`           | 
| `t`  | `trades`           | 
| `sd` | `side`             | 
| `ot` | `ord_type`         | 
| `sp` | `stop_price`       | 
| `ap` | `avg_price`        | 
| `aps`|                    |
| `ps` |                    |
| `tc` | `trade_count`      | 
| `B`  | `balances`         | 
| `rv` | `remaining_volume` | 
| `ev` | `executed_volume`  | or `filled` |
| `qv` | `quote_volume`     | quote volume used in kline |
| `S`  | `state`            | 
| `R`  | `resolution`       | kline resolution |
| `cu` | `currency`         | 
| `fc` | `fee currency`     | 
| `av` | `available`        | 
| `l`  | `locked`           | 
| `f`  | `fee`              | 
| `oi` | `order id`         | in trade |
| `ti` | `trade id`         | 
| `ci` | `client oid`       | 
| `gi` | `group id`         | 
| `tr` | `trend`            | 
| `co` | `code`             |
| `_q` |                    |
| `_t` |                    |


## Error response

If you get any error response, it will be concentrated in an array.

```json
{
  "e": "error",
  "E": ["...."],
  "i": "client1",
  "T": 1234567890000
}
```

### Example

When you send a command with invalid action, you will get following error message:

```json
{
  "e": "error",
  "E": [ "E-1004: invalid action"],
  "i": "client1",
  "T": 1678096431125
}
```

### Error type 

| code | error message                                    | description             
| ---- | ------------------------------------------------ | ------------------- 
| 1004 | invalid action                                   | The action in `action` field is not supported.
| 1005 | invalid json                                     | The command is not in a valid JSON format.
| 1006 | invalid nonce (difference of 30 seconds or more) | The difference between the nonce you provided and the server's nonce is more than 30 seconds.
| 1007 | authentication failed                            | Not authenticated. Might need to check your api key/secret or the way you send auth command.
| 1012 | nonce has already been used                      | The nonce you provided has already been used.
