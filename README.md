## Sebas (sebastian)

DIY nodejs server for dev environment and internal projects

### Usage

#### Installation

```
npm i sebas --save
```

#### Server instance

```javascript

await sebas.start({ debugMode: !1, port: 8000 })

sebas.get('/')
 .pipe((request, response) => {
	 response.writeHead(200, {
		 'Content-Type': 'text/plain'
	 })
	 response.end('Hello World!')
	})

```
#### Start options

* debugMode - Run cli logs on the internal code (default=false)
* port - port
* timeout - server timeout (default=5000)

#### Supported methods

* get
* post
* put
* delete
* options

****

```javascript
sebas.post('/*', (req, res) => {
	// do something
})
```

### Using sb-static to serve static files


**Implementation:**

```javascript

const sebas = require('sebas')
const { servestatic } = require('sb-static')
const memchync = require('memchync')
const { format } = require('@jp6rt/utils')

// initialize memcached
memchync.init('127.0.0.1:11211')

sebas.get('/*')
 .pipe((request, response, next) => {
		
 servestatic(request, response, next, {
  'dir': format('{0}/dist', __dirname),
  'hashedStore': sebas.hashedStore,
  'memchync': memchync,
  'fallBack':  format('{0}/dist/index.html', __dirname)
 })

 })

;(async () => {
 await sebas.start({ debugMode: !0, port: 8000 })
})()

```

### Stability

* Experimental - The project is initially created as a playground. Currently it has passed basic expectations for an http server.