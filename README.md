# Node compression

## How to run

### Receiver (server)

```shell
npm run --prefix ./receiver start
```

### Sender

```shell
npm run --prefix ./sender start
```

### Running tests

```shell
npm run --prefix ./sender test
```

### Coverage

```shell
npm run --prefix ./sender coverage
```

## Assumptions
Tried to think in this way:
1. Sensor is a client that is able to send data to the server.
2. It is possible to have as many sensors as you want.
3. Sensor is able to gather data continuously or/and it is able to send big amount of data

## Trade-offs
1. Decided to use websocket server instead http server as receiver. Also decided to use websocket stream instead http post request in sender.
    I think that websockets are better than http for chunked transfers of data (our case).
2. Decided to not collect list of chunks in data (receiver) and then log the whole result but to log chunks separately.
2. Decided to move custom streams in separate classes. Reason: possibility to test as separate units, keep better structure.
