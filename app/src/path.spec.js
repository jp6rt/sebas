const { splitter, valid, isRouteParam, validPath, normalize } = require('./path')

describe('path utility functions', () => {
	const path1 = '/users'
	const path2 = '/users/:id'
	const path3 = '/'
	describe('(splitter)', () => {
		it('should split the path into [/users]', () => {
			expect(splitter(path1)).toEqual(['/users'])
		})
		it('should split the path into [/users, :id]', () => {
			expect(splitter(path2)).toEqual(['/users', '/:id'])
		})
		it('should split the path into [/]', () => {
			expect(splitter(path3)).toEqual(['/'])
		})
	})
	describe('(valid)', () => {
		const notValidPath = 'sebas'
		it('should validate the path1, path2, path3', () => {
			expect(valid(path1)).toBeTruthy()
			expect(valid(path2)).toBeTruthy()
			expect(valid(path3)).toBeTruthy()
		})
		it('should not validate this path (sebas)', () => {
			expect(valid(notValidPath)).toBeFalsy()
		})
	})
	describe('(isRouteParam)', () => {
		it('should detect as route parameter', () => {
			expect(isRouteParam('/:id')).toBeTruthy()
		})
		it('should NOT detect as route parameter', () => {
			expect(isRouteParam(path1)).toBeFalsy()
		})
	})
	describe('(validPath)', () => {
		it('should detect as valid path', () => {
			expect(validPath(path2)).toBeTruthy()
			expect(validPath('/path/subpath')).toBeTruthy()
		})
		it('should NOT detect as valid path', () => {
			expect(validPath('path/subpath')).toBeFalsy()
		})
	})
	describe('(normalize)', () => {
		it('should return the same normalized value for path1', () => {
			expect(normalize(path1)).toEqual(path1)
		})
		const path4 = '//sebas'
		const path5 = '/sebas//:sebas'
		it('should normalize the paths', () => {
			expect(normalize(path4)).toEqual('/sebas')
			expect(normalize(path5)).toEqual('/sebas/:sebas')
		})
	})
})