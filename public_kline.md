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

<!-- ws:begin fields channel=kline -->
| Field | Type | Description |
|---|---|---|
| `c` | string | channel |
| `M` | string | market |
| `e` | string | event, `snapshot` or `update` |
| `T` | number | time the message was sent, unix timestamp in milliseconds |
| `k` | object | kline |
| `k.ST` | number | start time, unix timestamp in milliseconds |
| `k.ET` | number | end time, unix timestamp in milliseconds |
| `k.M` | string | market |
| `k.R` | string | resolution, such as `1m` or `1h` |
| `k.O` | string | open price, decimal string |
| `k.H` | string | high price, decimal string |
| `k.L` | string | low price, decimal string |
| `k.C` | string | close price, decimal string |
| `k.v` | string | volume in the base currency, decimal string |
| `k.qv` | string | volume in the quote currency, decimal string |
| `k.ti` | number | id of the last trade in the kline |
| `k.x` | bool | whether the kline is closed |
<!-- ws:end -->

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