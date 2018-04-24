describe('Route Parameter Functions', () => {
	const { getParamName, routeParamScheme, extractRouteParams } = require('./routeparam')

	describe('(getParamName)', () => {

		it('should return \'id\'', () => {
			expect(getParamName('/:id')).toEqual('id')
		})

		it('should return \'id\'', () => {
			expect(getParamName('/:type')).not.toEqual('id')
		})

	})

	describe('(routeParamScheme)', () => {

		const routePath = '/users/:id'
		const routeParams = [{ routeIndex: 1, routeParam: 'id' }]

		it('should match the expected routeParams', () => {
			expect(routeParamScheme(routePath)).toEqual(routeParams)
		})

		const routePath2 = '/type/:type/id/:id'
		const routeParams2 = [{ routeIndex: 1, routeParam: 'type' }, { routeIndex: 3, routeParam: 'id' }]

		it('should match the expected routeParams', () => {
			expect(routeParamScheme(routePath2)).toEqual(routeParams2)
		})

		const routePath3 = '/view/sub'
		const routeParams3 = []

		it('should match the expected routeParams', () => {
			expect(routeParamScheme(routePath3)).toEqual(routeParams3)
			expect(routeParamScheme(routePath3).length).toEqual(0)
		})

	})

	describe('(extractRouteParams)', () => {

		const routePath = '/users/:id'
		const reqPath = '/users/1'
		const routeParams = {id: '1'} // always treat values as type string

		it('should match the expected routeParams Obj', () => {
			expect(extractRouteParams(reqPath, routePath)).toEqual(routeParams)
		})

		const routePath2 = '/type/:type/id/:id'
		const reqPath2 = '/type/1/id/2'
		const routeParams2 = {id: '2', type: '1'} // always treat values as type string

		it('should match the expected routeParams Obj', () => {
			expect(extractRouteParams(reqPath2, routePath2)).toEqual(routeParams2)
		})

		const routePath3 = '/users/1'
		const reqPath3 = '/users/2'
		
		it('should match the expected routeParams Obj', () => {
			expect(extractRouteParams(reqPath3, routePath3)).toEqual({})
		})

	})
})