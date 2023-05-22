# Kline subscription

The kline channel is primarily designed to provide kline data. When subscribing, you need to specify the kline channel and market. Additionally, we offer a `resolution` field that allows you to subscribe to kline data with different resolutions. The available resolution options include `1m`, `5m`, `15m`, `30m`, `1h`, `2h`, `4h`, `6h`, `12h`, and `1d`. 

If you don't specify a resolution, the default value is set to `1m`.

```json
{
  "channel": "kline",
  "market": "ethusdt",
  "resolution": "1m" // optional
}
```

## Success response

### Field

| Abbr             | Type                      | Description                                          |
| ---------------- | --------------------------| -----------------------------------------------------|
| `c`              | string                    | channel
| `e`              | string                    | event (`snapshot` or `update`)
| `k`              | kline data                | kline
| (under the `k`)  | ---                       | ---
| `ST`             | int                       | start time, unix timestamp in millisecond
| `ET`             | int                       | end time, unix timestamp in millisecond
| `M`              | string                    | market
| `R`              | string                    | resolution
| `O`              | string of float           | open
| `H`              | string of float           | high
| `L`              | string of float           | low
| `C`              | string of float           | close
| `v`              | string of float           | volume
| `ti`             | int                       | last trade id
| `x`              | bool                      | closed

### Snapshot

```json
{
  "c": "kline",
  "M": "ethusdt",
  "e": "snapshot",
  "T": 1684743644396,
  "k": {
    "ST": 1684743600000,
    "ET": 1684743659999,
    "M": "ethusdt",
    "R": "1m",
    "O": "1815.11",
    "H": "1815.11",
    "L": "1815.11",
    "C": "1815.11",
    "v": "0",
    "ti": 58684589,
    "x": false
  }
}
```

### Update

```json
{
  "c": "kline",
  "M": "ethusdt",
  "e": "update",
  "T": 1684743650395,
  "k": {
    "ST": 1684743600000,
    "ET": 1684743659999,
    "M": "ethusdt",
    "R": "1m",
    "O": "1815.11",
    "H": "1815.11",
    "L": "1815.11",
    "C": "1815.11",
    "v": "0",
    "ti": 58684589,
    "x": false
  }
}
```