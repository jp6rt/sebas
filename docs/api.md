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
**chaining handlers**
```javascript
sebas.options('/status')
.pipe((request, response) => { 
	//
})
.pipe((request, response) => { 
	//
})
.handle()
```
### Handlers
**static handlers**

```javascript
static(dir: string, responseHeaders, fallback): RouteHandler
```

```javascript
sebas.get('/public', sebas.static)
.pipe((req, res) => {

})
.handle()
```

### Events

**SebasStarted**
> Emitted when sebas has started
**SebasStopped**
> Emitted when sebas is stopped
