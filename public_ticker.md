# Ticker subscription

```json
{
  "channel": "ticker",
  "market": "btctwd"
}
```
## Success response

### Snapshot
```json
{
 "c": "ticker",
 "e": "snapshot",
 "M": "btctwd",
 "tk": {
    "M": "btctwd", // same as the above "M"
    "O": "280007.1",
    "H": "280017.2",
    "L": "280005.3",
    "C": "280004.5",
    "v": "71.01"
 },
 "T": 123456789
}
```

### Update
```json
{
 "c": "ticker",
 "e": "update",
 "M": "btctwd",
 "tk": {
    "M": "btctwd", // same as the above "M"
    "O": "280007.1",
    "H": "280017.2",
    "L": "280005.3",
    "C": "280004.5",
    "v": "71.01"
 },
 "T": 123456789
}
```
