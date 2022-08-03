# Market status subscription

This channel will provide the market status of Max platform.

```json
{
  "channel": "market_status"
}
```

## Success response

### Field

| Abbr             | Type                      | Description                                          |
| ---------------- | --------------------------| -----------------------------------------------------|
| `c`              | string                    | channel
| `e`              | string                    | event (`snapshot` or `update`)
| `ms`             | array of market status    | market status
| (under the `ms`) | ---                       | ---
| `M`              | string                    | market
| `st`             | string                    | status (`active`, `suspended` or `cancel-only`)
| `bu`             | string                    | base unit
| `bup`            | int                       | base unit precision
| `mba`            | float                     | minimal base amount
| `qu`             | string                    | quote unit
| `qup`            | int                       | quote unit precision
| `mqa`            | float                     | minimal quote amount
| `mws`            | bool                      | mwallet supported

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