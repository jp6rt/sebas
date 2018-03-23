const $hash = require('./hash')
const hash = $hash.hash
const hashpath = $hash.hashpath

describe('Hash Functions', () => {
	const path = '/users'
	const pathWildCard = '/users/'
	const subpath = '/users/:id'

	it('(hash) should return the same value', () => {
		// multiple tries
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
})