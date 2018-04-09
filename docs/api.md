## API Documentation

> Visit ./types.md for reference on each types

> All types with {pending: true} will be updated once there is partia/final type

### Server
**Starting the server**
```javascript
start(config: Config): Observable<{pending: true}>
```
> Emits event SebasStarted
**Stopping the server**
```javascript
stop(): Observable<{pending: true}>
```
> Emits event SebasStopped
### Adding routes
**Basic middleware**
```javascript
(Handlers[])(path: string, handler?: PathHandler): RouteHandler
```
**handle the path**
```javascript
(instanceof RouteHandler).handle()
```

**add middleware (pipe)**
```javascript
// overload
(instanceof RouteHandler).pipe(handler: PathHandler)
(instanceof RouteHandler).pipe(path: string, handler: PathHandler)
```

**chaining handlers**
```javascript
sebas.get('/users')
.pipe('./', (request, response, next, data) => { // equivalent to .pipe((request, response)
	// handle all requests to this path
})
.pipe('./:id', (request, response, next, data) => {
	// handle all requests with id not null
})

sebas.post('/login')
.pipe(Athentication)
.pipe(ResponseHandler)
})
```
### Handlers
**static handlers**

```javascript
static(dir: string, responseHeaders: ResponseHeaders, fallback?: string): RouteHandler
``` 

```javascript
sebas.get('/public', sebas.static)
.pipe((req, res) => {

})
```

### Events

**SebasStarted**
> Emitted when sebas has started
**SebasStopped**
> Emitted when sebas is stopped
