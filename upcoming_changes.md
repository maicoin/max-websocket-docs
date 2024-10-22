## Upcomping Changes

### New Features (2024-11-04)
#### Websocket IP Connection Limits
- Receiving a 429 response will result in an automatic IP ban; it is your responsibility to refrain from spamming.
- A `Retry-After` header is included in 429 responses, indicating the Unix timestamp in seconds for when you can reconnect.
- Rate limit violations will result in a penalty. You must wait for the full period of the penalty before making any subsequent requests. Failure to yield to the penalty will result in a reset of the penalty period.
