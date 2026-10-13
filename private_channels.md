# Private channels subscription

Please see [Authentication](authentication.md) first. Each section below is one filter.

## Order response

Tracks your open orders. With the `order` filter, the server first sends all of your open orders as an `order_snapshot`, then an `order_update` whenever one of your orders changes.

### Field

<!-- ws:begin fields filter=order -->
| Field | Type | Description |
|---|---|---|
| `c` | string | channel |
| `e` | string | event, `order_snapshot` or `order_update` |
| `o` | array | orders |
| `o[]` | object | one order |
| `o[].i` | number | order id |
| `o[].sa` | string | sub-account serial number; empty for the main account |
| `o[].sd` | string | side, `bid` or `ask` |
| `o[].ot` | string | order type, such as `limit`, `market`, `stop_limit`, `stop_market`, `post_only` or `ioc_limit` |
| `o[].p` | string | price, decimal string; null when the order has no price, such as a market order |
| `o[].sp` | null or string | stop price, decimal string; null unless the order is a stop order |
| `o[].ap` | string | average filled price, decimal string |
| `o[].v` | string | volume, decimal string |
| `o[].rv` | string | remaining volume, decimal string |
| `o[].ev` | string | executed volume, decimal string |
| `o[].S` | string | state, such as `wait`, `done` or `cancel` |
| `o[].M` | string | market |
| `o[].tc` | number | number of trades the order has filled |
| `o[].T` | number | created time, unix timestamp in milliseconds |
| `o[].TU` | number | updated time, unix timestamp in milliseconds |
| `o[].gi` | null or number | group id; null when the order has none |
| `o[].ci` | null or string | client order id; null when the order has none |
| `T` | number | time the message was sent, unix timestamp in milliseconds |
<!-- ws:end -->

### Snapshot

```json
{
  "c": "user",
  "e": "order_snapshot",
  "o": [{
     "i": 87,
     "sd": "bid",
     "ot": "limit",
     "p": "21499.0",
     "sp": "21499.0",
     "ap": "21499.0",
     "v": "0.2658",
     "rv": "0.0",
     "ev": "0.2658",
     "S": "done",
     "M": "ethtwd",
     "tc": 1,
     "T": 1659419048000,
     "TU": 1659419048406,
     "gi": 123,
     "ci": "client-oid-1"
  }, ...],
  "T": 1521726960357
}
```

### Update

```json
{
  "c": "user",
  "e": "order_update",
  "o": [{
     "i": 87,
     "sd": "bid",
     "ot": "limit",
     "p": "21499.0",
     "sp": "21499.0",
     "ap": "21499.0",
     "S": "done",
     "M": "ethtwd",
     "T": 1521726960123,
     "TU": 1521726960123,
     "v": "0.2658",
     "rv": "0.0",
     "ev": "0.2658",
     "tc": 1,
     "ci": "client-oid-1",
     "gi": 123
  }, ...],
  "T": 1521726960357
}
```

## Trade response

Tracks your trades. With the `trade` filter, the server first sends your last 100 trades as a `trade_snapshot`, then a `trade_update` for every new trade.

### Field

<!-- ws:begin fields filter=trade -->
| Field | Type | Description |
|---|---|---|
| `c` | string | channel |
| `e` | string | event, `trade_snapshot` or `trade_update` |
| `t` | array | trades |
| `t[]` | object | one trade |
| `t[].i` | number | trade id |
| `t[].sa` | string | sub-account serial number; empty for the main account |
| `t[].M` | string | market |
| `t[].sd` | string | side of your order, `bid` or `ask` |
| `t[].p` | string | price, decimal string |
| `t[].v` | string | volume, decimal string |
| `t[].fn` | string | funds, the quote amount of the trade, decimal string |
| `t[].f` | string | fee, decimal string |
| `t[].fc` | string | fee currency |
| `t[].fd` | bool | whether the fee is discounted, for example by paying it in MAX token |
| `t[].T` | number | created time, unix timestamp in milliseconds |
| `t[].TU` | number | updated time, unix timestamp in milliseconds |
| `t[].m` | bool | whether your order was the maker |
| `t[].oi` | number | id of your order |
| `t[].rpi` | bool | whether the trade filled an RPI order |
| `T` | number | time the message was sent, unix timestamp in milliseconds |
<!-- ws:end -->

### Snapshot
```json
{
  "c": "user",
  "e": "trade_snapshot",
  "t": [{
    "i": 68444,
    "M": "ethtwd",
    "sd": "bid",
    "p": "21499.0",
    "v": "0.2658",
    "f": "3.2",
    "fc": "twd",
    "fd": false,
    "fn": "5714.4342",
    "T": 1659216053748,
    "TU": 1659216054046,
    "m": true,
    "oi": 3253823664
  }, ...],
  "T": 1659412100259
}
```

### Update

```json
{
  "c": "user",
  "e": "trade_update",
  "t": [{
    "i": 68444,
    "M": "ethtwd",
    "sd": "bid",
    "p": "21499.0",
    "v": "0.2658",
    "f": "3.2",
    "fc": "twd",
    "fd": false,
    "fn": "5714.4342",
    "T": 1659216053748,
    "TU": 1659216054046,
    "m": true,
    "oi": 3253823664
  }],
  "T": 1521726960357
}
```


## Fast trade response

Like `trade`, but without the fee fields and without a snapshot, which makes it faster. Use the `fast_trade_update` filter.

### Field

<!-- ws:begin fields filter=fast_trade_update -->
| Field | Type | Description |
|---|---|---|
| `c` | string | channel |
| `e` | string | event, `fast_trade_update` |
| `t` | array | trades |
| `t[]` | object | one trade |
| `t[].i` | number | trade id |
| `t[].sa` | string | sub-account serial number; empty for the main account |
| `t[].M` | string | market |
| `t[].sd` | string | side of your order, `bid` or `ask` |
| `t[].p` | string | price, decimal string |
| `t[].v` | string | volume, decimal string |
| `t[].fn` | string | funds, the quote amount of the trade, decimal string |
| `t[].T` | number | created time, unix timestamp in milliseconds |
| `t[].TU` | number | updated time, unix timestamp in milliseconds |
| `t[].m` | bool | whether your order was the maker |
| `t[].oi` | number | id of your order |
| `t[].rpi` | bool | whether the trade filled an RPI order |
| `T` | number | time the message was sent, unix timestamp in milliseconds |
<!-- ws:end -->

### Update

```json
{
  "c": "user",
  "e": "fast_trade_update",
  "t": [{
    "i": 68444,
    "M": "ethtwd",
    "sd": "bid",
    "p": "21499.0",
    "v": "0.2658",
    "fn": "5714.4342",
    "T": 1659216053748,
    "TU": 1659216054046,
    "m": true,
    "oi": 3253823664
  }],
  "T": 1521726960357
}
```

## Account response

Tracks your balances. With the `account` filter, the server first sends the balance of every currency in your wallet as an `account_snapshot`, then an `account_update` whenever a balance changes.

### Field

<!-- ws:begin fields filter=account -->
| Field | Type | Description |
|---|---|---|
| `c` | string | channel |
| `e` | string | event, `account_snapshot` or `account_update` |
| `B` | array | balances |
| `B[]` | object | balance of one currency |
| `B[].sa` | string | sub-account serial number; empty for the main account |
| `B[].cu` | string | currency |
| `B[].av` | string | available balance, decimal string |
| `B[].l` | string | locked balance, decimal string |
| `B[].stk` | null or string | staked balance, decimal string; may be null |
| `B[].TU` | number | updated time, unix timestamp in milliseconds |
| `T` | number | time the message was sent, unix timestamp in milliseconds |
<!-- ws:end -->

### Snapshot

```json
{
  "c": "user",
  "e": "account_snapshot",
  "B": [
    {
      "cu": "btc",
      "av": "123.4",
      "l": "0.5",
      "stk": null,
      "TU": 1659390246343,
    },
    ...
  ],
  "T": 1659412100181
}
```

### Update

```json
{
  "c": "user",
  "e": "account_update",
  "B": [
    {
      "cu": "btc",
      "av": "123.4",
      "l": "0.5",
      "stk": null,
      "TU": 1659390246343,
    }
  ],
  "T": 1659412100181,
}
```
