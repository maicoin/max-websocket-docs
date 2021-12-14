# 私人頻道

請先看 [驗證](authentication.md) 章節.

## 未成交訂單
這個頻道會回傳你尚未成交的訂單

### 快照
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
     "tc": 1,
     "ci": "client-oid-1",
     "gi": 123 // group id
  }, ...],
  "T": 1521726960357
}
```

### 更新
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
     "tc": 1,
      "ci": "client-oid-1",
     "gi": 123 // group id
  }, ...],
  "T": 1521726960357
}
```

## 交易
這個頻道會回傳你成交的交易資料

### 快照

```json
{
  "c": "user",
  "e": "trade_snapshot",
  "t": [{
    "i": 68444, // trade id
    "p": "21499.0", // price
    "v": "0.2658", // volume
    "M": "ethtwd", // market ID
    "T": 1521726960357, // millisecond timestamp
    "sd": "bid", // side
    "f": "3.2", // fee
    "fc": "twd", // fee currency
    "oi": 33445566, // order id
    "m": true    // liquidity = maker
  }],
  "T": 1521726960357
}
```

### 更新
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
    "oi": 33445566, // order id    
    "m": true    // liquidity = maker
  }],
  "T": 1521726960357
}
```

## 帳戶
這個頻道會回傳你的帳戶資料，所謂快照是所有幣種的快照資訊，更新則是每個幣種有更新都會回傳。

### 快照
```json
{
  "c": "user",
  "e": "account_snapshot",
  "B": [
    {
      "cu": "btc",
      "av": "123.4",
      "l": "0.5"
    },
    ...
  ],
  "T": 123456789
}
```

### 更新
```json
{
  "c": "user",
  "e": "account_update",
  "B": [
    {
      "cu": "btc",
      "av": "123.4",
      "l": "0.5"
    },
    ...
  ],
  "T": 123456789,
}
```
