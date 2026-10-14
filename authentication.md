# Authentication for private channels

Private channels need an API key. Create one at https://max.maicoin.com/api_tokens and give it read permission for the data you want: **Order / Trade** for orders and trades, and **Account & Personal Information** for balances.

To authenticate, send an `auth` action with these fields:

| Field | Description |
|---|---|
| `apiKey` | your API key |
| `nonce` | the current time in milliseconds since the Unix epoch. It must be within 30 seconds of the server time, and each nonce can only be used once |
| `signature` | the HMAC-SHA256 of the nonce, written as a decimal string and keyed with your API secret, in hex |
| `filters` | optional; which private messages to receive, see [Subscription with filters](#subscription-with-filters) |
| `subAccount` | optional; the serial number of a sub-account, the same value as the `sa` field of private messages. You then receive that sub-account's messages; omit it for the main account |
| `id` | optional; any string you choose. The response carries it back as `i` |

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

Each filter makes the server send you one kind of private message, starting with a snapshot where the message has one:

<!-- ws:begin filters -->
| Filter | You receive | Details |
|---|---|---|
| `order` | `order_snapshot`, `order_update` | [Order response](private_channels.md#order-response) |
| `trade` | `trade_snapshot`, `trade_update` | [Trade response](private_channels.md#trade-response) |
| `fast_trade_update` | `fast_trade_update` | [Fast trade response](private_channels.md#fast-trade-response) |
| `account` | `account_snapshot`, `account_update` | [Account response](private_channels.md#account-response) |
| `mwallet_order` | `mwallet_order_snapshot`, `mwallet_order_update` | [MWallet order response](private_channels_mwallet.md#mwallet-order-response) |
| `mwallet_trade` | `mwallet_trade_snapshot`, `mwallet_trade_update` | [MWallet trade response](private_channels_mwallet.md#mwallet-trade-response) |
| `mwallet_fast_trade_update` | `mwallet_fast_trade_update` | [MWallet fast trade response](private_channels_mwallet.md#mwallet-fast-trade-response) |
| `mwallet_account` | `mwallet_account_snapshot`, `mwallet_account_update` | [MWallet account response](private_channels_mwallet.md#mwallet-account-response) |
| `ad_ratio` | `ad_ratio_snapshot`, `ad_ratio_update` | [MWallet AD ratio response](private_channels_mwallet.md#mwallet-ad-ratio-response) |
| `borrowing` | `borrowing_snapshot`, `borrowing_update` | [MWallet borrowing response](private_channels_mwallet.md#mwallet-borrowing-response) |
<!-- ws:end -->

If `filters` is omitted or empty, you receive `order`, `trade` and `account`. Every other filter, including the MWallet ones, has to be listed explicitly.

```json
{
  "action": "auth",
  ...
  "filters": ["order", "trade"] // no balances
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
