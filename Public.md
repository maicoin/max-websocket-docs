# Public Channel Subscription

## Subscribe
```json
{
  "cmd": "sub",
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
  "cmd": "unsub",
  "subscription": [
    {"channel": "book", "market": "btctwd", "depth": 1},
    {"channel": "trade", "market": "btctwd" }
  ]
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