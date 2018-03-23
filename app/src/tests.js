const $hash = require('./hash')
const hash = $hash.hash
const hashpath = $hash.hashpath
// const dehash = $hash.dehash
// const format = require('./common').format

// console.log('(hash) /admin', hash('/admin'))
// console.log('(hash) a', hash('/a'))
// console.log('(hash) iamaverylogworddfgthdfgdfg', hash('/iamaverylogworddfgthdfgdfg'))

console.log('(hash) /users', hash('/users'))
console.log('(hash) /users/', hash('/users/'))
console.log('(hash) /:id', hash('/:id'))

console.log('(hash1) /users', hash('/users'))
console.log('(hash1) /users/', hash('/users/'))
console.log('(hash1) /:id', hash('/:id'))

console.log('(hashpath) /users', hashpath('/users'))
console.log('(hashpath) /users/', hashpath('/users/'))
console.log('(hashpath) /users/:id', hashpath('/users/:id'))

console.log('(hashpath1) /users', hashpath('/users'))
console.log('(hashpath1) /users/', hashpath('/users/'))
console.log('(hashpath1) /users/:id', hashpath('/users/:id'))

/*
console.log('(hash1) admin', hash('/admin'))
console.log('(hash1) a', hash('/a'))
console.log('(hash1) iamaverylogworddfgthdfgdfg', hash('/iamaverylogworddfgthdfgdfg'))

console.log('(hash2) admin', hash('/admin'))
console.log('(hash2) a', hash('/a'))
console.log('(hash2) iamaverylogworddfgthdfgdfg', hash('/iamaverylogworddfgthdfgdfg'))
*/