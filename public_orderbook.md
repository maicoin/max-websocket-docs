# Order book Subscription

You need to specify book channel for subscribing order book, and indicate which market you want to subscribe in subscriptions. We also provide `depth` parameter to let you get limit level response. we only support for three kinds of depth: 1, 5, 10, 20, 50 (default is 50).


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
 "T": 1591869939634,
 "fi":12141725,       // First update ID in event
 "li":12141725,       // Last update ID in event
 "v":1725602999632    // Event version
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
 "T": 1591869939634,
 "fi":12141726,       // Frist update ID in event
 "li":12141726,       // Last update ID in event
 "v":1725602999632    // Event version
}
```

## Maintain your own order book

1. Subscribe to the WebSocket channel.
2. Upon receiving an snapshot event, create an order book locally, and recorded the last id (`li`) and version (`v`) on the local side. If there’s already an order book locally, the newly received one completely replaces the original.
3. Upon receiving an update event, first verify if its `v` is the same. If it's different, go back to step 2.
4. Upon receiving an update event, if `fi` <= local `li`, discard it.
5. The first update event to be processed must satisfy `fi` <= (local `li` + 1) <= `li`; otherwise, go back to step 1 to resubscribe.

Notes:
- If the volume is equal to 0, remove that price level.
- If you receive a snapshot event during the subscription process, please go back to step 2 to rebuild your local order book.
- It is normal to receive events indicating the removal of price levels that are not present in your local order book.
