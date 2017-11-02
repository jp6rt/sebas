"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const http = require("http");
class Sebas extends events_1.EventEmitter {
    constructor() {
        super();
        this.server = http.createServer((req, res) => {
            // middleswares here
        });
    }
    start() {
        console.log('start');
    }
}
exports.default = Sebas;
