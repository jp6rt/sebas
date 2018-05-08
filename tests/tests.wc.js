/**
 * Text for the fix on wildcard f-slash prefixing issue
 */

const sebas = require('../src/sebas')
const http = require('http')
const logger = (require('@jp6rt/cli-logger'))('Tests', !0)
// const { format } = require('@jp6rt/utils')

sebas.get('*')
  .pipe((request, response) => {
    response.writeHead(200, {
      'Content-Type': 'text/plain'
    })
    response.end('Hello World!')
  })
 
;(async () => {
  await sebas.start({ debugMode: !0, port: 3000 })


  http.get('http://localhost:3000', (response) => {

    const { headers }= response

    logger.silent('response headers: {0}', headers)

    response.on('data', (data) => {
      logger.primary('response data: {0}', data.toString())
    })

    sebas.stop()
  })

})()