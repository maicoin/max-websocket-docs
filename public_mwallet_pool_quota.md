# MWallet pool quota subscription

Get MWallet total available loan quota.

```json
{ 
  "channel": "pool_quota", 
  "currency": "usdt"
}
```

## Success response

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
