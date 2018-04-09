const Sebas = require('./classes/Sebas')

/**
 * @global
 * sebas global object
 */
const sebas = process.sebas instanceof Sebas || new Sebas()
process.sebas = sebas
module.exports = sebas