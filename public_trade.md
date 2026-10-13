# Trade subscription

```json
{
  "channel": "trade",
  "market": "btctwd"
}
```

## Success response

### Field

<!-- ws:begin fields channel=trade -->
| Field | Type | Description |
|---|---|---|
| `c` | string | channel |
| `M` | string | market |
| `e` | string | event, `snapshot` or `update` |
| `t` | array | trades |
| `t[]` | object | one trade |
| `t[].p` | string | price, decimal string |
| `t[].v` | string | volume, decimal string |
| `t[].T` | number | trade time, unix timestamp in milliseconds |
| `t[].tr` | string | trend, `up` or `down` |
| `t[].rpi` | bool | whether the trade filled an RPI order |
| `T` | number | time the message was sent, unix timestamp in milliseconds |
<!-- ws:end -->

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