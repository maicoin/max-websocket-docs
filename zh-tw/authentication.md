# 驗證

請先至 http://max.maicoin.com/api_tokens 申請 API key 跟 secret，如果想要訂閱訂單跟交易資料，記得勾選 Order/Trade 的讀取權限，而帳戶資料則需要 Account & Personal Information 的讀取權限。

Nonce 應該是一組正整數的時間戳記，並且以毫秒為單位，建議不要跟伺服器時間差 30 秒上。

請使用你的 secret，用 HMAC- SHA256 加密你的 nonce。
這邊也可以在你的請求裡面指定一個 id，可以用來作為回應訊息的參考。

## NodeJS 範例
```javascript
const API_KEY = "api key from max website";
const API_SECRET = "api secret from max website";
const crypto = require("crypto");
const hmac = crypto.createHmac("sha256", API_SECRET);

const nonce = Date.now();
const signature = hmac.update(""+nonce).digest("hex");
```

## 訂閱
```json
{
  "action": "auth",
  "apiKey": "...",
  "nonce": 1591690054859,
  "signature": "....",
  "id": "client-id"
}
```

## 指定訂閱
如果你想指定訂閱某些頻道，可以使用 `filters` 參數，請條列你想訂閱的頻道在裡面。
我們支援四種參數 `order`, `trade`, `account`, `trade_update`。
前三者都會收到 snapshot 跟 update，最後一個是提供給只想訂閱 trade update 的人使用。

```json
{
  "action": "auth",
  ...
  "filters": ["order", "trade"] // ignore account update
}
```

## 成功回應
```json
{
  "e": "authenticated",
  "i": "client-id",
  "T": 1591686735192
}
```
