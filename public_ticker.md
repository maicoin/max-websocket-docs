# Ticker subscription

```json
{
  "channel": "ticker",
  "market": "btctwd"
}
```
## Success response

### Field

| Abbr             | Type                      | Description                                          |
| ---------------- | --------------------------| -----------------------------------------------------|
| `c`              | string                    | channel
| `e`              | string                    | event (`snapshot` or `update`)
| `M`              | string                    | market
| `tk`             | ticker data               | ticker
| (under the `tk`) | ---                       | ---
| `M`              | string                    | market
| `O`              | string of float           | open
| `H`              | string of float           | high
| `L`              | string of float           | low
| `C`              | string of float           | close
| `v`              | string of float           | volume
| `V`              | string of float           | volume in BTC


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
