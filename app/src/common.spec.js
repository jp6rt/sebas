describe('Commons', () => {
	const common = require('./common')	
	describe('(format)', () => {
		const format = common.format
		const result = 'foobar'
		it('should equal foobar', () => {
			expect(format('{0}{1}', 'foo', 'bar')).toEqual(result)
			expect(format(['{0}{1}', 'foo', 'bar'])).toEqual(result) //arguments as array
		})
	})
	describe('(random)', () => {
		const random = common.random
		xit('should be a whole number', () => {
			
		})
		it('should be within 1-10', () => {
			// a series of random numbers to be tested
			expect(random()).toBeGreaterThan(0)
			expect(random()).toBeLessThan(11)
			expect(random()).toBeGreaterThan(0)
			expect(random()).toBeLessThan(11)
			expect(random()).toBeGreaterThan(0)
			expect(random()).toBeLessThan(11)
			expect(random()).toBeGreaterThan(0)
			expect(random()).toBeLessThan(11)
			expect(random()).toBeGreaterThan(0)
			expect(random()).toBeLessThan(11)
			expect(random()).toBeGreaterThan(0)
			expect(random()).toBeLessThan(11)
			expect(random()).toBeGreaterThan(0)
			expect(random()).toBeLessThan(11)
			expect(random()).toBeGreaterThan(0)
			expect(random()).toBeLessThan(11)
			expect(random()).toBeGreaterThan(0)
			expect(random()).toBeLessThan(11)
			expect(random()).toBeGreaterThan(0)
			expect(random()).toBeLessThan(11)
			expect(random()).toBeGreaterThan(0)
			expect(random()).toBeLessThan(11)
		})
	})
	xdescribe('(partitionString)', () => {
		it('should return a partitioned string')
	})
})