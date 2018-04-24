const { matchPath } = require('./path')

describe('(matchPath)', () => {

	const reqPath1 = '/'
	const reqPath1_1 = '/index.html'
	const reqPath2 = '/home'
	const reqPath2_1 = '/home/index.html'
	const reqPath3 = '/view'
	const reqPath3_1 = '/view/'
	const reqPath4 = '/view/sub1'
	const reqPath5 = '/view/sub2'
	const reqPath5_1 = '/view/sub2/index.html'

	describe('[scenario1], routePath: *', () => {			
		const routePath = '*'

		it('should pass all', () => {
			expect(matchPath(routePath, reqPath1)).toBeTruthy()
			expect(matchPath(routePath, reqPath1_1)).toBeTruthy()
			expect(matchPath(routePath, reqPath2)).toBeTruthy()
			expect(matchPath(routePath, reqPath3)).toBeTruthy()
			expect(matchPath(routePath, reqPath3_1)).toBeTruthy()
			expect(matchPath(routePath, reqPath4)).toBeTruthy()
			expect(matchPath(routePath, reqPath5)).toBeTruthy()
			expect(matchPath(routePath, reqPath5_1)).toBeTruthy()
		})
	})

	describe('[scenario2], routePath: /', () => {			
		const routePath = '/'

		it('should pass all', () => {
			expect(matchPath(routePath, reqPath1)).toBeTruthy()
			expect(matchPath(routePath, reqPath1_1)).toBeTruthy()
			expect(matchPath(routePath, reqPath2)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath3)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath3_1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath4)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath5)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath5_1)).not.toBeTruthy()
		})
	})

	describe('[scenario3], routePath: /home', () => {
		const routePath = '/home'

		it('should pass all', () => {
			expect(matchPath(routePath, reqPath1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath1_1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath2)).toBeTruthy()
			expect(matchPath(routePath, reqPath2_1)).toBeTruthy()
			expect(matchPath(routePath, reqPath3)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath3_1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath4)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath5)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath5_1)).not.toBeTruthy()
		})
	})

	describe('[scenario4], routePath: /view', () => {
		const routePath = '/view'

		it('should pass all', () => {
			expect(matchPath(routePath, reqPath1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath1_1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath2)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath2_1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath3)).toBeTruthy()
			expect(matchPath(routePath, reqPath3_1)).toBeTruthy()
			expect(matchPath(routePath, reqPath4)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath5)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath5_1)).not.toBeTruthy()
		})
	})

	describe('[scenario5], routePath: /view/*', () => {
		const routePath = '/view/*'

		it('should pass all', () => {
			expect(matchPath(routePath, reqPath1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath1_1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath2)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath2_1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath3)).toBeTruthy()
			expect(matchPath(routePath, reqPath3_1)).toBeTruthy()
			expect(matchPath(routePath, reqPath4)).toBeTruthy()
			expect(matchPath(routePath, reqPath5)).toBeTruthy()
			expect(matchPath(routePath, reqPath5_1)).toBeTruthy()
		})
	})

	describe('[scenario6], routePath: /view/', () => {
		const routePath = '/view/'

		it('should pass all', () => {
			expect(matchPath(routePath, reqPath1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath1_1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath2)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath2_1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath3)).toBeTruthy()
			expect(matchPath(routePath, reqPath3_1)).toBeTruthy()
			expect(matchPath(routePath, reqPath4)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath5)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath5_1)).not.toBeTruthy()
		})
	})

	describe('[scenario7], routePath: /view/sub1', () => {
		const routePath = '/view/sub1'

		it('should pass all', () => {
			expect(matchPath(routePath, reqPath1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath1_1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath2)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath2_1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath3)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath3_1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath4)).toBeTruthy()
			expect(matchPath(routePath, reqPath5)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath5_1)).not.toBeTruthy()
		})
	})

	describe('[scenario8], routePath: /view/sub2', () => {
		const routePath = '/view/sub2'

		it('should pass all', () => {
			expect(matchPath(routePath, reqPath1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath1_1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath2)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath2_1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath3)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath3_1)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath4)).not.toBeTruthy()
			expect(matchPath(routePath, reqPath5)).toBeTruthy()
			expect(matchPath(routePath, reqPath5_1)).toBeTruthy()
		})
	})

})

describe('(matchPath + route parameters)', () => {

	describe('[scenario1], routePath: /users/:id',() => {

		const routePath = '/users/:id'
		const requestPath = '/users/1'

		it('should match', () => {
			expect(matchPath(routePath, requestPath)).toBeTruthy()
		})

		it('should NOT match', () => {
			// intentionally typod users to user
			expect(matchPath('/user/:id', requestPath)).toBeFalsy()
		})

	})

	describe('[scenario2], routePath: /info/type/:type/id/:id',() => {

		const routePath = '/info/type/:type/id/:id'
		const requestPath = '/info/type/1/id/2'

		it('should match', () => {
			expect(matchPath(routePath, requestPath)).toBeTruthy()
		})

		it('should NOT match', () => {
			// intentionally typo info to infos
			expect(matchPath('/infos/type/:type/id/:id', requestPath)).toBeFalsy()
		})

	})

	describe('[scenario2.1 + extra parameters], routePath: /info/type/:type/id/:id/:data',() => {

		const routePath = '/info/type/:type/id/:id/:data'
		const requestPath = '/info/type/1/id/2/3456'

		it('should match', () => {
			expect(matchPath(routePath, requestPath)).toBeTruthy()
		})

		it('should NOT match', () => {
			// intentionally typo info to infos
			expect(matchPath('/infos/type/:type/id/:id/:data', requestPath)).toBeFalsy()
		})

	})

})