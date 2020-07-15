# Authentication for private channels

apply api key and secret from http://max.maicoin.com/api_tokens
nonce should be unique integer (better use timestamp)
signature use HMAC sha256 with your api secret to encode nonce

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
