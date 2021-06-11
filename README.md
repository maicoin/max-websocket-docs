# Introduction

Official documentation for the new redesign MAX Exchange websocket service

__Endpoint__: `wss://max-stream.maicoin.com/ws`

__Important note__
> * price and volume should be string
> * timestamp and depth should be number

## Keep connection
You need to use ping frame to keep connection with server. If server doesn't receive your ping for 1 minute. The connection will be closed by server side. Some libraries will do this for you, so please check your library first.

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
| `ST` | `startTime`        | 
| `ET` | `endTime`          | 
| `k`  | `kline`            | 
| `a`  | `asks`             | 
| `b`  | `bids`             | 
| `M`  | `market`           | 
| `m`  | `maker`            | 
| `p`  | `price`            | 
| `v`  | `volume`           | 
| `O`  | `open`             | 
| `C`  | `close`            | 
| `H`  | `high`             | 
| `L`  | `low`              | 
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
  "T": 123456789
}
```
