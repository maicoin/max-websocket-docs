# Index price subscription

To get the index prices of MWallet, you need to specify `index_price` channel and indicate which market you want to subscribe in subscriptions.

```json
{
  "channel": "index_price",
  "market": "btcusdt"
}
```

## Success response

### Snapshot
```json
{
    "c": "index_price",
    "e": "snapshot",
    "idxp": {
        "M": "btcusdt",      // market
        "p": "63190.045"     // price
    },
    "T": 1634874536518
}
```
### Update
```json
{
    "c": "index_price",
    "e": "update",
    "idxp": {
        "M": "btcusdt",      // market
        "p": "63190.045"     // price
    },
    "T": 1634874536518
}
```