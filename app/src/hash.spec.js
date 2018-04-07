const $hash = require('./hash')
const hash = $hash.hash
const hashpath = $hash.hashpath
const PATH_CONST_CHARS = require('./enums/path_const_chars')

const format = require('./common').format

describe('Hash Functions', () => {
	const path = '/users'
	const pathWildCard = '/users/'
	const subpath = '/users/:id'

	it('(hash) should return the same value', () => {
		// multiple triesPATH_CONST_CHARS
		expect(hash(path)).toEqual(hash(path))
		expect(hash(path)).toEqual(hash(path))
		expect(hash(path)).toEqual(hash(path))
	})

	it('(hashpath) should return the same value', () => {
		// multiple tries
		expect(hashpath(pathWildCard)).toEqual(hashpath(pathWildCard))
		expect(hashpath(pathWildCard)).toEqual(hashpath(pathWildCard))

		expect(hashpath(subpath)).toEqual(hashpath(subpath))
		expect(hashpath(subpath)).toEqual(hashpath(subpath))
	})

	it ('should replace route param with the PARAM constant', () => {
		expect(hash('/:id')).toEqual(PATH_CONST_CHARS.PARAM)
		expect(hashpath('/:id')).toEqual(PATH_CONST_CHARS.PARAM)
	})

	it('should use the correct splitted hash format', () => {
		const hashed = hash(path)
		expect(hashpath('/users/:id')).toEqual(format('{0}{1}{2}', hashed, PATH_CONST_CHARS.DIV, PATH_CONST_CHARS.PARAM))
	})
})
