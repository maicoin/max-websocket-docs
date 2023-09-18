# Order book Subscription

You need to specify book channel for subscribing order book, and indicate which market you want to subscribe in subscriptions. We also provide `depth` parameter to let you get limit level response. we only support for three kinds of depth: 1, 5, 10.

```json
{
  "channel": "book",
  "market": "btctwd",
  "depth": 1 // optional
}
```

## Success response (snapshot/update)
When you subscribed successful, you will get an order book snapshot response, you will continue to get updates if order book is updated.

### Snapshot
```json
{
 "c": "book",
 "e": "snapshot",
 "M": "btcusdt",
 "a": [["5337.3", "0.1"]],
 "b": [["5333.3", "0.5"]],
 "T": 1591869939634
}
```

### Update
```json
{
 "c": "book",
 "e": "update",
 "M": "btcusdt",
 "a": [["5337.3", "0.01037"]],
 "b": [],
 "T": 1591869939634
}
```

## Maintain your own order book

1. if you get snapshot, use response to initialize your order book.
2. if you get updates, when volume is 0 means to remove this price level, otherwise to add this price level to ask or bid, resort array and keep it in your mappings.