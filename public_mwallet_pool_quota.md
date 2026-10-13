# MWallet pool quota subscription

Get MWallet total available loan quota.

```json
{ 
  "channel": "pool_quota", 
  "currency": "usdt"
}
```

## Success response

### Field

<!-- ws:begin fields channel=pool_quota -->
| Field | Type | Description |
|---|---|---|
| `c` | string | channel |
| `e` | string | event, `snapshot` or `update` |
| `qta` | object | pool quota |
| `qta.sa` | string | sub-account serial number; empty for the main account |
| `qta.cu` | string | currency |
| `qta.av` | string | available loan quota, decimal string |
| `qta.TU` | number | updated time, unix timestamp in milliseconds |
| `T` | number | time the message was sent, unix timestamp in milliseconds |
<!-- ws:end -->

### Snapshot
```json
{
  "c": "pool_quota",
  "e": "snapshot",
  "qta": {
    "cu": "usdt",             // currency
    "av": "501353.81385068",  // available quota
    "TU": 1641551141618
  },
  "T":1641772933737
}
```

### Update
```json
{
  "c": "pool_quota",
  "e": "update",
  "qta": {
    "cu": "usdt",             // currency
    "av": "501353.81385068",  // available quota
    "TU": 1641551141618
  },
  "T":1641772933737
}
```
