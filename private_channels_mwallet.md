# MWallet private channels subscription

Please see [Authentication](authentication.md) first.

If you want to subscribe MWallet related websocket channels, please specify following filters explicitly when you authenticate the websocket.

Currently supported filters: `mwallet_order`, `mwallet_trade`, `mwallet_fast_trade_update`, `mwallet_account`, `ad_ratio` and `borrowing`.

## MWallet order response

This channel is designed to help you in tracking your open orders of mwalletå. When authenticating with the `mwallet_order` filter specified, we will first return all of your existing open orders of mwallet. Subsequently, if there are any updates to your mwallet orders, we will return order update messages.

### Field

| Abbr            | Type                      | Description                                          |
| --------------- | --------------------------| -----------------------------------------------------|
| `c`             | string                    | channel
| `e`             | string                    | event (`mwallet_order_snapshot` or `mwallet_order_update`)
| `o`             | array of orders           | orders
| (under the `o`) | ---                       | ---
| `i`             | int                       | id
| `sd`            | string                    | side (`bid` or `ask`)
| `ot`            | string                    | order type (`limit`, `market`, `stop_limit`, `stop_market`, `post_only` or `ioc_limit`)
| `p`             | string of float           | price
| `sp`            | string of float or `null` | stop price
| `ap`            | string of float           | average price
| `v`             | string of float           | volume
| `rv`            | string of float           | remain volume
| `ev`            | string of float           | executed volume
| `S`             | string                    | state
| `M`             | string                    | market
| `tc`            | int                       | trade count
| `T`             | int                       | order created time, unix timestamp in millisecond
| `TU`            | int                       | order updated time, unix timestamp in millisecond
| `gi`            | int or `null`             | group order id
| `ci`            | string or `null`          | client specific order id

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

This channel is created to assist you in monitoring your mwallet trades. When you authenticate with the `mwallet_trade` filter specified, we will initially provide you with the last 100 trades as a trade snapshot. After that, if there are any updates to your mwallet trades, we will send you trade update messages.

### Field

| Abbr            | Type                      | Description                                          |
| --------------- | --------------------------| -----------------------------------------------------|
| `c`             | string                    | channel
| `e`             | string                    | event (`mwallet_trade_snapshot` or `mwallet_trade_update`)
| `t`             | array of trades           | trades
| (under the `t`) | ---                       | ---  
| `i`             | int                       | id
| `M`             | string                    | market
| `sd`            | string                    | side (`bid` or `ask`)
| `p`             | string of float           | price
| `v`             | string of float           | volume
| `f`             | string of float           | fee
| `fc`            | string                    | fee currency
| `fn` .          | string                    | funds, the quote balance used in this trade.
| `T`             | int                       | trade created time, unix timestamp in millisecond
| `TU`            | int                       | trade updated time, unix timestamp in millisecond
| `m`             | bool                      | maker
| `oi`            | int                       | order id

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

This is similar to the mwallet_trade_update channel, but it excludes the `fee` related fields and without snapshot, making it faster.

### Field

| Abbr            | Type                      | Description                                          |
| --------------- | --------------------------| -----------------------------------------------------|
| `c`             | string                    | channel
| `e`             | string                    | event (`mwallet_fast_trade_update`)
| `t`             | array of trades           | trades
| (under the `t`) | ---                       | ---  
| `i`             | int                       | id
| `M`             | string                    | market
| `sd`            | string                    | side (`bid` or `ask`)
| `p`             | string of float           | price
| `v`             | string of float           | volume
| `fn` .          | string                    | funds, the quote balance used in this trade.
| `T`             | int                       | trade created time, unix timestamp in millisecond
| `TU`            | int                       | trade updated time, unix timestamp in millisecond
| `m`             | bool                      | maker
| `oi`            | int                       | order id


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

This channel provides you with information regarding your account balances of mwallet. When you authenticate with the `mwallet_account` filter specified, we will initially provide you with a snapshot message that includes all currencies in your mwallet. Subsequently, if there is any change in the balance of any currency, we will send you an update message.

### Field

| Abbr            | Type                      | Description
| --------------- | ------------------------- |--------------- 
| `c`             | string                    | channel
| `e`             | string                    | event (`mwallet_account_snapshot` or `mwallet_account_update`)
| `B`             | array of balances         | balances
| (under the `B`) | ---                       | --- 
| `cu`            | string                    | currency
| `av`            | string of float           | available
| `l`             | string of float           | locked
| `stk`           | string of float or `null` | staked
| `TU`            | int                       | balance updated time, unix timestamp in millisecond

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

This channel will return the message with your AD ratio of mwallet.

### Field

| Abbr                  | Type                      | Description
| --------------------- | ------------------------- |--------------- 
| `c`                   | string                    | channel
| `e`                   | string                    | event (`ad_ratio_snapshot` or `ad_ratio_update`)
| `ad`                  | AD ratio                  | AD ratio
| (under the `ad`)      | ---                       | --- 
| `ad`                  | string of float           | AD ratio
| `as`                  | string of float           | asset in usdt
| `db`                  | string of float           | debt in usdt
| `TU`                  | int                       | updated time, unix timestamp in millisecond
| `idxp`                | array of index price      | index price
| (under the `ad.idxp`) | ---                       | --- 
| `M`                   | string                    | market of index price 
| `p`                   | string of float           | price of index price

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

This channel will return your borrowing principal and interest of mwallet.

### Field

| Abbr            | Type                      | Description
| --------------- | ------------------------- |--------------- 
| `c`             | string                    | channel
| `e`             | string                    | event (`borrowing_snapshot` or `borrowing_update`)
| `db`            | array of debt             |
| (under the `db`)| ---                       | --- 
| `cu`            | string                    | currency
| `dbp`           | string of float           | debt principal
| `dbi`           | string of float           | debt interest
| `TU`            | int                       | updated time, unix timestamp in millisecond


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