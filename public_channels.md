# Public Channel Subscription

## Subscribe
You can specify an id to mark your request, and it will be your reference for response.

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