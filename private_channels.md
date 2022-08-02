# Private channels subscription

Please see [Authentication](authentication.md) first.

## Order response
This channel will return the message with your open orders.

### Field

| Abbr            | Type                      | Description                                          |
| --------------- | --------------------------| -----------------------------------------------------|
| `c`             | string                    | channel
| `e`             | string                    | event (`order_snapshot` or `order_update`)
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

This channel will return the message with your trades.
Snapshot includes the last 100 trades.

### Field

| Abbr            | Type                      | Description                                          |
| --------------- | --------------------------| -----------------------------------------------------|
| `c`             | string                    | channel
| `e`             | string                    | event (`trade_snapshot` or `trade_update`)
| `t`             | array of trades           | trades
| (under the `t`) | ---                       | ---  
| `i`             | int                       | id
| `M`             | string                    | market
| `sd`            | string                    | side (`bid` or `ask`)
| `p`             | string of float           | price
| `v`             | string of float           | volume
| `f`             | string of float           | fee
| `fc`            | string                    | fee currency
| `T`             | int                       | trade created time, unix timestamp in millisecond
| `TU`            | int                       | trade updated time, unix timestamp in millisecond
| `m`             | bool                      | maker
| `oi`            | int                       | order id

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
    "T": 1659216053748,
    "TU": 1659216054046,
    "m": true,
    "oi": 3253823664
  }],
  "T": 1521726960357
}
```

## Account response

This channel will return the message with your balances.
Snapshot message includes all currencies in your wallet, and update only return the specified currency had changed.


### Field

| Abbr            | Type                      | Description
| --------------- | ------------------------- |--------------- 
| `c`             | string                    | channel
| `e`             | string                    | event (`account_snapshot` or `account_update`)
| `B`             | array of balances         | balances
| (under the `B`) | ------------------------- | --------------
| `cu`            | string                    | currency
| `av`            | string of float           | available
| `l`             | string of float           | locked
| `stk`           | string of float or `null` | staked
| `TU`            | int                       | balance updated time, unix timestamp in millisecond

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
