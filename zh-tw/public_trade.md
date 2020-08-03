# 成交資料

```json
{
  "channel": "trade",
  "market": "btctwd"
}
```

## 成功回應

### 快照
```json
{
  "c": "trade",
  "e": "snapshot",
  "M": "btctwd",
  "t":[{
    "p": "5337.3",
    "v": "0.1",
    "T": 123456789,
    "tr": "up"
  }],
  "T": 123456789
}
```
### 更新
```json
{
  "c": "trade",
  "e": "update",
  "M": "btctwd",
  "t":[{
    "p": "5337.3",
    "v": "0.1",
    "T": 123456789,
    "tr": "up"
  }],
  "T": 123456789
}
```