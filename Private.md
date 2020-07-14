# Private channels subscription

please see [Authentication](./Authentication.md) first.

## Order(open orders) response

### Snapshot
```json
{
  "c": "user",
  "e": "order_snapshot",
  "o": [{
     "i": 87, // order id
     "d": "buy",
     "R": "limit",
     "p": "21499.0",
     "P": "21499.0",
     "A": "21499.0",
     "S": "done",
     "M": "ethtwd",
     "T": 1521726960123,
     "v": "0.2658",
     "r": "0.0",
     "f": "0.2658",
     "Q": 1
  }, ...],
  "T": 1521726960357,
}
```

### Update
```json
{
  "c": "user",
  "e": "order_update",
  "o": [{
     "i": 87, // order id
     "d": "buy",
     "R": "limit",
     "p": "21499.0",
     "P": "21499.0",
     "A": "21499.0",
     "S": "done",
     "M": "ethtwd",
     "T": 1521726960123,
     "v": "0.2658",
     "r": "0.0",
     "f": "0.2658",
     "Q": 1
  }, ...],
  "T": 1521726960357,
}
```

## Trade response

### Snapshot
```json
{
  "c": "user",
  "e": "trade_snapshot",
  "t": [{
    "i": 68444, // trade id
    "p": "21499.0",
    "v": "0.2658",
    "M": "ethtwd",
    "T": 1521726960357,
    "sd": "bid",
    "f": "3.2",
    "fc": "twd",
    "m": true,    // maker
    "oi": 7123
  }],
  "T": 1521726960357,
}
```

### Update
```json
{
  "c": "user",
  "e": "trade_update",
  "t": [{
    "i": 68444, // trade id
    "p": "21499.0",
    "v": "0.2658",
    "M": "ethtwd",
    "T": 1521726960357,
    "sd": "bid",
    "f": "3.2",
    "fc": "twd",
    "m": true,    // maker
    "oi": 7123
  }],
  "T": 1521726960357,
}
```

## Account response

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
    },
    ...
  ],
  "T": 123456789,
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
    },
    ...
  ],
  "T": 123456789,
}
```
