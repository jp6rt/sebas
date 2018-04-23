describe('Commons', () => {
	const { partitionString } = require('./common')	
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