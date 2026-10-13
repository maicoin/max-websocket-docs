# Order book Subscription

Subscribe to the `book` channel with a `market`. The optional `depth` limits how many price levels each side carries: `1`, `5`, `10`, `20` or `50` (the default).


```json
{
  "channel": "book",
  "market": "btctwd",
  "depth": 1 // optional
}
```

## Success response (snapshot/update)
Once subscribed, you receive a `snapshot` of the order book, then an `update` whenever it changes.

### Field

<!-- ws:begin fields channel=book -->
| Field | Type | Description |
|---|---|---|
| `c` | string | channel |
| `M` | string | market |
| `e` | string | event, `snapshot` or `update` |
| `a` | array | ask price levels |
| `a[]` | array | one ask level: [price, volume] |
| `a[][]` | string | price or volume, decimal string; a volume of 0 removes the level |
| `b` | array | bid price levels |
| `b[]` | array | one bid level: [price, volume] |
| `b[][]` | string | price or volume, decimal string; a volume of 0 removes the level |
| `T` | number | time the message was sent, unix timestamp in milliseconds |
| `fi` | number | first update id in this event |
| `li` | number | last update id in this event |
| `v` | number | order book version; resubscribe when it differs from the version of your local book |
<!-- ws:end -->

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
 "fi":12141726,       // First update ID in event
 "li":12141726,       // Last update ID in event
 "v":1725602999632    // Event version
}
```

## Maintain your own order book

1. Subscribe to the WebSocket channel.
2. Buffer the events you receive from the WebSocket.
3. On a `snapshot`, build the local order book from it and record its last id (`li`) and version (`v`). A snapshot always replaces any local order book you already have.
4. Apply the event (buffer and update) to the local order book.
5. Check that the event's `v` equals the local version. If it does not, go back to step 1 and resubscribe.
6. Drop any event where `fi` <= local `li`.
7. The first update you apply must satisfy `fi` <= (local `li` + 1) <= `li`; otherwise, go back to step 1 and resubscribe.

Notes:
- When a price level's volume is 0, remove that level.
- If another snapshot arrives while you are subscribed, go back to step 3 and rebuild the local order book from it.
- An update may remove a price level your local order book does not have; that is expected.

REMARKS:
When receiving an empty snapshot (e.q. empty `a` and `b`), please clear the local order book to avoid using old data and wait for subsequent snapshot.