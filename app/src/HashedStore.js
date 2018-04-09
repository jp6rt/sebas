/**
 * HashedStore - hashed paths stored on a map to avoid re-hashing paths on runtime
 */

const HashedStore = class {
	constructor() {
		this.hashedPaths = new Map
		this.hashedPathsReversed = new Map
	}
	/**
	 * store the hash path
	 * @method
	 * @param { string } routepath 
	 * @param { string } hashed 
	 */
	store(routepath, hashed) {
		this.hashedPaths.set(routepath, hashed)
		this.hashedPathsReversed.set(hashed, routepath)
	}
	/**
	 * retrives the hash for a path
	 * @function
	 * @param { string } routepath 
	 * @returns { string }
	 */
	retrieve(routepath) {
		return this.hashedPaths.get(routepath)
	}
	/**
	 * retrieves the path for a specific hash
	 * @function
	 * @param { string } hashed 
	 * @returns { string }
	 */
	getPath(hashed) {
		return this.hashedPathsReversed.get(hashed)
	}
}

module.exports = HashedStore