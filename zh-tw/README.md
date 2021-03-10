# 介紹

這是新設計的 MAX WebSocket 服務官方文件

__連線網址__: `wss://max-stream.maicoin.com/ws`

__重要須知__
> * price, volume 會是字串
> * timestamp, depth 會是數字

## 保持連線
你必須用 ping 框架來保持與伺服器的連線。如果伺服器端在一分鐘之內沒有收到你的 ping，伺服器端將會主動關閉連線。有些套件會主動幫你完成這些事情，建議使用前請先閱讀該套件的說明。

```javascript
const WebSocket = require('ws');
const url = "wss://max-stream.maicoin.com/ws"
const ws = new WebSocket(url);

ws.on('open', function open() {
  setInterval(() => {
    ws.ping("test")
  }, 30000);
})
ws.on('pong', function incoming(data) {
  // it will show "server pong test" on the screen
  console.log('server pong', data.toString());
});
```

## 鍵值表
我們用短的鍵值來減少回應的封包大小，請先仔細閱讀以下的對照表。

```json
"e": "event"
"E": "errors"
"c": "channel"
"i": "id"
"s": "subscription"
"T": "timestamp", "created_at"
"U": "updated_at"
"a": "asks"
"b": "bids"
"M": "market"
"m": "maker"
"p": "price"
"v": "volume"
"O": "open"
"H": "high"
"L": "low"
"C": "close"
"o": "orders"
"t": "trades"
"sd": "side"
"rv": "remaining_volume"
"ev": "executed_volume", "filled"
"S": "state"
"ot": "ord_type"
"sp": "stop_price"
"ap": "avg_price"
"tc": "trade_count"
"B": "balances"
"cu": "currency"
"fc": "fee currency"
"av": "available"
"l": "locked"
"f": "fee"
"oi": "order id"
"tr": "trend"
"ci": "client_oid"
"gi": "group id"
"co": "code"
```

## 錯誤處理
如果你收到伺服器端的回應是錯誤訊息的話，我們會將它集中在一個陣列裡面回應。

```json
{
  "e": "error",
  "E": ["...."],
  "i": "client1",
  "T": 123456789
}
```
