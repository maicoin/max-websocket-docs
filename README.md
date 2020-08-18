# Introduction

Official documentation for the new redesign max websocket service

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

```json
"e": "event"
"E": "errors"
"c": "channel"
"i": "id"
"s": "subscription"
"T": "timestamp", "created_at"
"U": "updated_at"
"a": "asks"
"b": "bids"
"M": "market"
"m": "maker"
"p": "price"
"v": "volume"
"O": "open"
"H": "high"
"L": "low"
"C": "close"
"o": "orders"
"t": "trades"
"sd": "side"
"rv": "remaining_volume"
"ev": "executed_volume", "filled"
"S": "state"
"ot": "ord_type"
"sp": "stop_price"
"ap": "avg_price"
"tc": "trade_count"
"B": "balances"
"cu": "currency"
"fc": "fee currency"
"av": "available"
"l": "locked"
"f": "fee"
"oi": "order id"
"tr": "trend"
"gi": "group id"
```

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