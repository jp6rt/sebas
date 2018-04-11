describe('Commons', () => {
	const { random, hexrandom, hexChars, partitionString, format  } = require('./common')	
	describe('(format)', () => {
		const result = 'foobar'
		it('should equal foobar', () => {
			expect(format('{0}{1}', 'foo', 'bar')).toEqual(result)
			expect(format(['{0}{1}', 'foo', 'bar'])).toEqual(result) //arguments as array
		})
	})
	describe('(random)', () => {
		it('should be a whole number', () => {
			expect(random() % 1).toEqual(0)
		})
		it('should be within 1-10', () => {
			// a series of random numbers to be tested
			expect(random()).toBeGreaterThan(0)
			expect(random()).toBeLessThan(11)
			expect(random()).toBeGreaterThan(0)
			expect(random()).toBeLessThan(11)
			expect(random()).toBeGreaterThan(0)
			expect(random()).toBeLessThan(11)
		})
	})
	describe('(hexrandom)', () => {
		it('should return a hex character', () => {
			expect(hexChars).toEqual(jasmine.arrayContaining([hexrandom()]))
			expect(hexChars).toEqual(jasmine.arrayContaining([hexrandom()]))
			expect(hexChars).toEqual(jasmine.arrayContaining([hexrandom()]))
		})
	})
	describe('(partitionString)', () => {
		const myStr = 'foobar'
		const partitioned = partitionString(myStr, 3)
		it('should partition the string into length of 3', () => {
			expect(partitioned).toEqual(['foo', 'bar'])
		})
		it('should not partition of the partition value is greater than or equal the input str length', () => {
			const partitioned2 =  partitionString(myStr, 6)
			const partitioned3 =  partitionString(myStr, 7)
			expect(partitioned2).toEqual(['foobar'])
			expect(partitioned3).toEqual(['foobar'])
		})
	})
})