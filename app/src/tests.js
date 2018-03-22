const hash = require('./hash').hash
// const format = require('./common').format

console.log('admin', hash('/admin'))
console.log('a', hash('/a'))
console.log('iamaverylongwordsssss', hash('/iamaverylongwordssssss'))