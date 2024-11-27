## 25.24.0 (2024-11-27)
- Support the trade_fast filter for private channel.

## 25.14.0 (2024-11-04)

### New Features
#### Websocket IP Rate Limit
- Receiving a 429 response will result in an automatic IP ban; it is your responsibility to refrain from spamming.
- A `Retry-After` header is included in 429 responses, indicating the Unix timestamp in seconds for when you can reconnect.
- Rate limit violations will result in a penalty. You must wait for the full period of the penalty before making any subsequent requests. Otherwise, the penalty time will be reset and the period of being banned will be prolonged.

## 25.12.0 (2024-10-22)

### New Features
* The order book supports using the version, first and last ID to verify data continuity.

## 6.66.0 (2024-05-13)

### New Features
* rate limit when your ip connection over 1440 per day


## 6.1.0 (2024-01-05)

### New Features
* rate limit when your request messages over 20 per second
* rate limit when your request messages over 200 per minute

## 5.120.0 (2023-12-04)

### New Features
* rate limit alert when your request messages over 20 per second (only alert message)
* rate limit alert when your request messages over 200 per minute (only alert message)

## v3.46.1 (2021-10-06)

### New Features
* Support MWallet related channels

## 1.3.0 (2020-08-18)

### Bug Fixes
* align json fields of open orders with MAX Rest API v2
* check ip if it is in trusted ip list from API key settings
