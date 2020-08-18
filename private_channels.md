# Private channels subscription

Please see [Authentication](authentication.md) first.

## Order response
This channel will return the message with your open orders.

### Snapshot
```json
{
  "c": "user",
  "e": "order_snapshot",
  "o": [{
     "i": 87, // order id
     "sd": "bid",
     "ot": "limit",
     "p": "21499.0",
     "sp": "21499.0",
     "ap": "21499.0",
     "S": "done",
     "M": "ethtwd",
     "T": 1521726960123,
     "v": "0.2658",
     "rv": "0.0",
     "ev": "0.2658",
     "tc": 1
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
     "i": 87, // order id
     "sd": "bid",
     "ot": "limit",
     "p": "21499.0",
     "sp": "21499.0",
     "ap": "21499.0",
     "S": "done",
     "M": "ethtwd",
     "T": 1521726960123,
     "v": "0.2658",
     "rv": "0.0",
     "ev": "0.2658",
     "tc": 1
  }, ...],
  "T": 1521726960357
}
```

## Trade response
This channel will return the message with your trades.
Snapshot includes all trades in the past 24 hours.

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
    "ci": "client-oid-1",
    "gi": 123, // group id
  }],
  "T": 1521726960357
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
    "ci": "client-oid-1",
    "gi": 123, // group id
  }],
  "T": 1521726960357
}
```

## Account response
This channel will return the message with your balances.
Snapshot message includes all currencies in your wallet, and update only return the specified currency had changed.

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
  "T": 123456789
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
