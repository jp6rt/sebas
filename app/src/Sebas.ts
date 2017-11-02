import { EventEmitter } from 'events'
import * as http from 'http'

import { ISebas } from 'apptypes'

class Sebas extends EventEmitter implements ISebas {
	private server: http.Server
	constructor() {
		super()
	}
	public start(): void {
		this.server = http.createServer((req, res) => {
			res.statusCode = 200
			res.setHeader('Content-Type', 'text/plain')
			res.end('Hello World\n')
		})
	}
}

export default Sebas