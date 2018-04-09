const PATH_CONST_CHARS = require('../enums/path_const_chars')

/**
 * @class
 * RouteHandler constructor
 */
const RouteHandler = class {
	/**
	 * 
	 * @param { string } hashedpath 
	 * @param { number } index 
	 * @param { function } handler 
	 */
	constructor(hashedpath, index, handler) {
		/**
		 * @property
		 * handlerIndex stores the position of the handler on the order
		 */
		this.handlerIndex = index
		/**
		 * @property
		 * handler stores the route handler
		 */
		this.handler = handler
		/**
		 * @property
		 */
		this.parentPath = hashedpath.split(PATH_CONST_CHARS.DIV)[0]
		/**
		 * @property
		 */
		this.path = hashedpath
	}
}

module.exports = RouteHandler