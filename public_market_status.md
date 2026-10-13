# Market status subscription

This channel will provide the market status of Max platform.

```json
{
  "channel": "market_status"
}
```

## Success response

### Field

<!-- ws:begin fields channel=market_status -->
| Field | Type | Description |
|---|---|---|
| `c` | string | channel |
| `e` | string | event, `snapshot` or `update` |
| `ms` | array | market statuses |
| `ms[]` | object | status of one market |
| `ms[].M` | string | market |
| `ms[].st` | string | status, `active`, `suspended` or `cancel-only` |
| `ms[].bu` | string | base currency |
| `ms[].bup` | number | base currency precision |
| `ms[].mba` | number | minimum base amount of an order |
| `ms[].qu` | string | quote currency |
| `ms[].qup` | number | quote currency precision |
| `ms[].mqa` | number | minimum quote amount of an order |
| `ms[].mws` | bool | whether the market supports m-wallet |
| `ms[].gs` | bool | whether the market supports grid trading |
| `ms[].gsm` | string | comma-separated grid investment modes the market supports, such as `quote-only,base+quote`; empty when grid trading is not supported |
| `ms[].ds` | bool | whether the market supports DCA |
| `T` | number | time the message was sent, unix timestamp in milliseconds |
<!-- ws:end -->

### Snapshot

```json
{
  "c": "market_status",
  "e": "snaptshot",
  "ms": [{
      "M": "btctwd",
      "st": "active",
      "bu": "btc",
      "bup": 8,
      "mba": 0.0004,
      "qu": "twd",
      "qup": 1,
      "mqa": 250,
      "mws": true
    }, ...],
  "T": 1659428472313
}
```

### Update

```json
{
  "c": "market_status",
  "e": "update",
  "ms": [{
      "M": "btctwd",
      "st": "active",
      "bu": "btc",
      "bup": 8,
      "mba": 0.0004,
      "qu": "twd",
      "qup": 1,
      "mqa": 250,
      "mws": true
    }],
  "T": 1659428472313
}
```