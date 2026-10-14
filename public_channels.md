# Public Channel Subscription

## Subscribe
Send a `sub` action with the channels you want. `id` is optional: any string you choose, carried back in the response as `i`.

```json
{
  "action": "sub",
  "subscriptions": [
    {"channel": "book", "market": "btctwd", "depth": 1},
    {"channel": "trade", "market": "btctwd"}
  ],
  "id": "client1"
}
```
## Subscribe success response
```json
{
  "e": "subscribed",
  "s": [
    {"channel": "book", "market": "btctwd", "depth": 1},
    {"channel": "trade", "market": "btctwd"}
  ],
  "i": "client1",
  "T": 123456789
}
```
## Unsubscribe
```json
{
  "action": "unsub",
  "subscriptions": [
    {"channel": "book", "market": "btctwd", "depth": 1},
    {"channel": "trade", "market": "btctwd" }
  ],
  "id": "client1"
}
```

## Unsubscribe success response
```json
{
  "e": "unsubscribed",
  "s": [
    {"channel": "book", "market": "btctwd", "depth": 1},
    {"channel": "trade", "market": "btctwd"}
  ],
  "i": "client1",
  "T": 123456789
}
```