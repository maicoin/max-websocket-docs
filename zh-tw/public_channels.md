# 市場頻道

## 訂閱方式
你可以在你的請求裡面指定一個 id，可以用來作為回應訊息的參考。

```json
{
  "action": "sub",
  "subscriptions": [
    {"channel": "book", "market": "btctwd", "depth": 1},
    {"channel": "trade", "market": "btctwd"}
  ],
  "id": "client1"
}
```
## 訂閱成功回應
```json
{
  "e": "subscribed",
  "s": [
    {"channel": "book", "market": "btctwd", "depth": 1},
    {"channel": "trade", "market": "btctwd"}
  ],
  "i": "client1",
  "T": 123456789
}
```
## 取消訂閱方式
```json
{
  "action": "unsub",
  "subscription": [
    {"channel": "book", "market": "btctwd", "depth": 1},
    {"channel": "trade", "market": "btctwd" }
  ]
  "id": "client1"
}
```

## 取消訂閱成功回應
```json
{
  "e": "unsubscribed",
  "s": [
    {"channel": "book", "market": "btctwd", "depth": 1},
    {"channel": "trade", "market": "btctwd"}
  ],
  "i": "client1",
  "T": 123456789
}
```