const { splitter, valid, isRouteParam, validPath, normalize } = require('./path')

describe('path utility functions', () => {
	const path1 = '/users'
	const path2 = '/users/:id'
	const path3 = '/'
	const path4 = '/*'
	const path5 = '/users/*'
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
		it('should split the path into [*] (wildcard)', () => {
			expect(splitter('*')).toEqual(['/*'])
		})
		it('should split the path into [/*]', () => {
			expect(splitter(path4)).toEqual(['/*'])
		})
		it('should split the path into [/users, /*]', () => {
			expect(splitter(path5)).toEqual(['/users', '/*'])
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

	// additional methods
	const { getTopParentPath, getFilename, removeFilename } = require('./path')

	describe('(getTopParentPath)', () => {
		it('should return a blank parent for single paths', () => {
			expect(getTopParentPath(path1)).toEqual('')
			expect(getTopParentPath('/')).toEqual('')
			expect(getTopParentPath('*')).toEqual('')
		})
		it('should return correct parent paths', () => {
			expect(getTopParentPath(path2)).toEqual('/users')
			expect(getTopParentPath(path5)).toEqual('/users')
			expect(getTopParentPath('p/sub/sub2')).toEqual('/p')
			expect(getTopParentPath('p/*/sub2')).toEqual('/p')
			expect(getTopParentPath('p/sub/*')).toEqual('/p')
		})
	})

	describe('(getFilename)', () => {
		it('should return the correct file name', () => {
			expect(getFilename('index.html')).toEqual('index.html')
			expect(getFilename('/dist/index.html')).toEqual('index.html')
		})
		it('should not return a file name', () => {
			expect(getFilename('/path/sub')).toEqual('')
			expect(getFilename('/path')).toEqual('')
			// expect(getFilename('/path/.index')).toEqual('') -- this should not fail
		})
	})

	describe('(removeFilename)', () => {
		it('should remove the file name', () => {
			expect(removeFilename('index.html')).toEqual('')
			expect(removeFilename('/dist/index.html')).toEqual('/dist')
		})

		it('should NOT remove the file name', () => {
			expect(removeFilename('/dist')).toEqual('/dist')
			expect(removeFilename(path1)).toEqual(path1)
			expect(removeFilename(path2)).toEqual(path2)
		})
	})
})