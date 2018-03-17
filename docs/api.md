## API Documentation

> Visit ./types.md for reference on each types

> All types with {pending: true} will be updated once there is partia/final type

### Server

**starting the server**

```javascript
start(config: Config): Observable<{pending: true}>
```

> Emits event SebasStarted

**stopping the server**

```javascript
stop(): Observable<{pending: true}>
```

> Emits event SebasStopped

***Adding routes***

### Events

**SebasStarted**

> Emitted when sebas has started

**SebasStopped**

> Emitted when sebas is stopped
