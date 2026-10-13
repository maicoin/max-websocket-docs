# MWallet private channels subscription

Please see [Authentication](authentication.md) first. Each section below is one filter. MWallet filters are never enabled by default; list the ones you want in `filters` when you authenticate.

## MWallet order response

Tracks your open MWallet orders. With the `mwallet_order` filter, the server first sends all of your open MWallet orders as an `mwallet_order_snapshot`, then an `mwallet_order_update` whenever one of them changes.

### Field

<!-- ws:begin fields filter=mwallet_order -->
| Field | Type | Description |
|---|---|---|
| `c` | string | channel |
| `e` | string | event, `mwallet_order_snapshot` or `mwallet_order_update` |
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
  "e": "mwallet_order_snapshot",
  "o": [
    {
      "i": 87,
      "sd": "bid",
      "ot": "limit",
      "p": "3320.49",
      "sp": null,
      "ap": "0.0",
      "v": "0.1",
      "rv": "0.1",
      "ev": "0.0",
      "S": "wait",
      "M": "ethusdt",
      "tc": 0,
      "T": 1633415952000,
      "TU": 1633415952701,
      "ci": "client-oid-1",
      "gi": 123 // group id
      }, ...],
      "T": 1633415952715
}
```

### Update

```json
{
  "c": "user",
  "e": "mwallet_order_update",
  "o": [{
    "i": 210233270,
    "sd": "bid",
    "ot": "limit",
    "p": "100.0",
    "sp": null,
    "ap": "0.0",
    "v": "0.1",
    "rv": "0.1",
    "ev": "0.0",
    "S": "cancel",
    "M": "ethusdt",
    "tc": 0,
    "T": 1633415966000,
    "TU": 1633415966001,
    "gi": null,
    "ci": null
  }],
  "T":1633415966510}
```

## MWallet trade response

Tracks your MWallet trades. With the `mwallet_trade` filter, the server first sends your last 100 MWallet trades as an `mwallet_trade_snapshot`, then an `mwallet_trade_update` for every new trade.

### Field

<!-- ws:begin fields filter=mwallet_trade -->
| Field | Type | Description |
|---|---|---|
| `c` | string | channel |
| `e` | string | event, `mwallet_trade_snapshot` or `mwallet_trade_update` |
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
  "e": "mwallet_trade_snapshot",
  "t": [{
    "i": 78, // trade id
    "M": "ethusdt",
    "sd": "bid",
    "p": "3320.49",
    "v": "0.1",
    "f": "0.00015",
    "fc": "eth",
    "fn":"77.38889",
    "T": 1633415966000,
    "TU": 1633415966001,
    "m": false, // maker
    "oi": 87
    }, ...],
  "T": 1521726960357
}
```

### Update
```json
{
  "c": "user",
  "e": "mwallet_trade_update",
  "t": [{
    "i": 78, // trade id
    "M": "ethusdt",
    "sd": "bid",
    "p": "3320.49",
    "v": "0.1",
    "f": "0.00015",
    "fc": "eth",
    "fn":"77.38889",
    "T": 1633359451377,
    "TU": 1633359451378,
    "m": false, // maker
    "oi": 123
  }],
  "T": 1521726960357
}
```


## MWallet fast trade response

Like `mwallet_trade`, but without the fee fields and without a snapshot, which makes it faster. Use the `mwallet_fast_trade_update` filter.

### Field

<!-- ws:begin fields filter=mwallet_fast_trade_update -->
| Field | Type | Description |
|---|---|---|
| `c` | string | channel |
| `e` | string | event, `mwallet_fast_trade_update` |
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
  "e": "mwallet_fast_trade_update",
  "t": [{
    "i": 78, // trade id
    "M": "ethusdt",
    "sd": "bid",
    "p": "3320.49",
    "v": "0.1",
    "fn":"77.38889",
    "T": 1633359451377,
    "TU": 1633359451378,
    "m": false, // maker
    "oi": 123
  }],
  "T": 1521726960357
}
```

## MWallet account response

Tracks your MWallet balances. With the `mwallet_account` filter, the server first sends the balance of every currency in your MWallet as an `mwallet_account_snapshot`, then an `mwallet_account_update` whenever a balance changes.

### Field

<!-- ws:begin fields filter=mwallet_account -->
| Field | Type | Description |
|---|---|---|
| `c` | string | channel |
| `e` | string | event, `mwallet_account_snapshot` or `mwallet_account_update` |
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
  "e": "mwallet_account_snapshot",
  "B": [
    {
      "cu": "btc",
      "av": "123.4",
      "l": "0.5",
      "stk": null,
    },
    ...
  ],
  "T": 1521726960357
}
```

### Update

```json
{
  "c": "user",
  "e": "mwallet_account_update",
  "B": [
    {
      "cu": "btc",
      "av": "123.4",
      "l": "0.5",
      "stk": null,
    },
    ...
  ],
  "T": 1521726960357,
}
```

## MWallet AD ratio response

Your MWallet AD ratio, with the assets, debts and index prices it is computed from. Use the `ad_ratio` filter.

### Field

<!-- ws:begin fields filter=ad_ratio -->
| Field | Type | Description |
|---|---|---|
| `c` | string | channel |
| `e` | string | event, `ad_ratio_snapshot` or `ad_ratio_update` |
| `ad` | object | AD ratio |
| `ad.sa` | string | sub-account serial number; empty for the main account |
| `ad.ad` | string | AD ratio, decimal string |
| `ad.as` | string | assets in USDT, decimal string |
| `ad.db` | string | debts in USDT, decimal string |
| `ad.idxp` | array | index prices used for the ratio |
| `ad.idxp[]` | object | index price of one market |
| `ad.idxp[].M` | string | market |
| `ad.idxp[].p` | string | index price, decimal string |
| `ad.TU` | number | updated time, unix timestamp in milliseconds |
| `T` | number | time the message was sent, unix timestamp in milliseconds |
<!-- ws:end -->

### Snapshot

```
{
  "c": "user",
  "e": "ad_ratio_snapshot",
  "ad": {
      "ad": "38.08306432",
      "as": "132071.22",
      "db": "3467.97775784",
      "idxp": [
          {             
              "M": "btcusdt",
              "p": "63190.045"
          }, 
          ...
      ],
      "TU": 1521726960300
  },
  "T": 1521726960357
}
```

### Update

```
{
  "c": "user",
  "e": "ad_ratio_update",      
  "ad": {
      "ad": "38.08306432",           // ad_ratio
      "as": "132071.22",             // asset_in_usdt
      "db": "3467.97775784",         // debt_in_usdt
      "idxp": [                      // index price
          {             
              "M": "btcusdt",        // market
              "p": "63190.045"       // price
          }, 
          ...
      ],
      "TU": 1521726960300           // updated_time
  },
  "T": 1521726960357
}
```

## MWallet borrowing response

Your MWallet debt per currency, as principal and interest. Use the `borrowing` filter.

### Field

<!-- ws:begin fields filter=borrowing -->
| Field | Type | Description |
|---|---|---|
| `c` | string | channel |
| `e` | string | event, `borrowing_snapshot` or `borrowing_update` |
| `db` | array | debts |
| `db[]` | object | debt of one currency |
| `db[].sa` | string | sub-account serial number; empty for the main account |
| `db[].cu` | string | currency |
| `db[].dbp` | string | debt principal, decimal string |
| `db[].dbi` | string | debt interest, decimal string |
| `db[].TU` | number | updated time, unix timestamp in milliseconds |
| `T` | number | time the message was sent, unix timestamp in milliseconds |
<!-- ws:end -->


### Snapshot

```
{
  "c": "user",
  "e": "borrowing_snapshot",
  "db": [ 
    {
      "cu": "usdt",
      "dbp": "500.0",
      "dbi": "0.00004488",
      "TU": 1521726960300
    }, ...
  ],
  "T": 1521726960357
}
```

### Update

```
{
  "c": "user",
  "e": "borrowing_update",
  "db": [ 
    {
      "cu": "usdt",
      "dbp": "500.0",
      "dbi": "0.00004488",
      "TU": 1521726960300
    }
  ],
  "T": 1521726960357
}
```