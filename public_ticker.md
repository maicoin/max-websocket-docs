# Ticker subscription

```json
{
  "channel": "ticker",
  "market": "btctwd"
}
```
## Success response

### Field

<!-- ws:begin fields channel=ticker -->
| Field | Type | Description |
|---|---|---|
| `c` | string | channel |
| `M` | string | market |
| `e` | string | event, `snapshot` or `update` |
| `tk` | object | ticker |
| `tk.M` | string | market |
| `tk.O` | string | open price, decimal string |
| `tk.H` | string | high price, decimal string |
| `tk.L` | string | low price, decimal string |
| `tk.C` | string | close price, decimal string |
| `tk.v` | string | volume in the base currency, decimal string |
| `tk.V` | string | volume converted to BTC, decimal string |
| `T` | number | time the message was sent, unix timestamp in milliseconds |
<!-- ws:end -->


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
    "v": "71.01",
    "V": "71.01" // volumes in BTC
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
    "v": "71.01",
    "V": "71.01" // volumes in BTC
 },
 "T": 123456789
}
```
