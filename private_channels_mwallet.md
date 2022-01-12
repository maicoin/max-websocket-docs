# MWallet private channels subscription

Please see [Authentication](authentication.md) first.

If you want to subscribe MWallet related websocket channels, please specify following filters explicitly when you authenticate the websocket.

Currently supported filters: `mwallet_order`, `mwallet_trade`, `mwallet_account`, `ad_ratio` and `borrowing`.

## MWallet order response

This channel will return the message with your open orders of mwallet.

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

This channel will return the message with your trades of mwallet.
Snapshot includes the last 100 trades.

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
    "T": 1633359451377,
    "TU": 1633359451378,
    "m": false, // maker
    "oi": 123
  }],
  "T": 1521726960357
}
```

## MWallet account response

This channel will return the message with your balances of mwallet.
Snapshot message includes all currencies in your wallet, and update only return the specified currency had changed.

### Snapshot

```json
{
  "c": "user",
  "e": "mwallet_account_snapshot",
  "B": [
    {
      "cu": "btc",
      "av": "123.4",
      "l": "0.5"
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
      "l": "0.5"
    },
    ...
  ],
  "T": 1521726960357,
}
```

## MWallet AD ratio response

This channel will return the message with your AD ratio of mwallet.

### Snapshot

```
{
  "c": "user",
  "e": "ad_ratio_snapshot",      
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

This channel will return your borrowing principal and interest of mwallet.

### Snapshot

```
{
  "c": "user",
  "e": "borrowing_snapshot",      
  "db": [                       // debt
    {
      "cu": "usdt",
      "dbp": "500.0",           // debt_principal
      "dbi": "0.00004488",      // debt_interest
      "TU": 1521726960300       // updated_time
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
  "db": [                       // debt
    {
      "cu": "usdt",
      "dbp": "500.0",           // debt_principal
      "dbi": "0.00004488",      // debt_interest
      "TU": 1521726960300       // updated_time
    }
  ],
  "T": 1521726960357
}
```