# Official Documentation for the new redesign MAX Websocket

websocket endpoint: `wss://max-stream.maicoin.com/ws`

*Important note*
* price and volume should be string
* timestamp, depth, precision should be number

Keep connection
you can use ping pong to keep connection with server

## Response key alias

we use short keys to reduce response size, please check out mappings below.

```json
"e": "event"
"E": "errors"
"c": "channel"
"i": "id" // client customized id
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
"d": "side"
"rv": "remaining_volume"
"ev": "executed_volume", "filled"
"S": "state" ?
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
"oi": "order id" // in trade
"tr": "trend"
"gi": "group id"
```

## Error Response

if you get any error response, it will concentrate in an array.

```json
{
  "e": "error",
  "E": ["...."],
  "i": "client1",
  "T": 123456789
}
```

## Details

* [Public channels subscription](./Public.md)
* [Orderbook subscription](./Public_Orderbook.md)
* [Trade subscription](./Public_Trade.md)
* [Ticker subscription](./Public_Ticker.md)
* [Authentication](./Authentication.md)
* [Private Channels subscription](./Private.md)
