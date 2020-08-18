# Authentication for private channels

Please apply api key and secret from http://max.maicoin.com/api_tokens first, for order and trade data, you will need to check read permission for Order / Trade. And for account data, please check read permission for Account & Personal Information.

Nonce is a timestamp in positive integer, stands for milliseconds elapsed since Unix epoch. Nonce must be within 30 seconds difference of server time.

Create signature by using sha256 HMAC with your api secret to encode nonce.
You can specify an id to mark your request, and it will be your reference for response.

## NodeJS example
```javascript
const API_KEY = "api key from max website";
const API_SECRET = "api secret from max website";
const crypto = require("crypto");
const hmac = crypto.createHmac("sha256", API_SECRET);

const nonce = Date.now();
const signature = hmac.update(""+nonce).digest("hex");
```

## Subscription
```json
{
  "action": "auth",
  "apiKey": "...",
  "nonce": 1591690054859,
  "signature": "....",
  "id": "client-id"
}
```

## Subscription with filters
If you want to get the specified channels, you can use `filters` parameter. Please indicate what channel you want to listen.

We support four types of filter included `order`, `trade`, `account`, `trade_update`. if you don't want to receive snapshot of your trades, please use `trade_update` instead of `trade`.

```json
{
  "action": "auth",
  ...
  "filters": ["order", "trade"] // ignore account update
}
```

## Success response
```json
{
  "e": "authenticated",
  "i": "client-id",
  "T": 1591686735192
}
```
