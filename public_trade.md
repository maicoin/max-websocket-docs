# Trade subscription

```json
{
  "channel": "trade",
  "market": "btctwd"
}
```

## Success response

### Snapshot
```json
{
  "c": "trade",
  "e": "snapshot",
  "M": "btctwd",
  "t":[{
    "p": "5337.3",
    "v": "0.1",
    "T": 123456789,
    "tr": "up"
  }],
  "T": 123456789
}
```
### Update
```json
{
  "c": "trade",
  "e": "update",
  "M": "btctwd",
  "t":[{
    "p": "5337.3",
    "v": "0.1",
    "T": 123456789,
    "tr": "up"
  }],
  "T": 123456789
}
```