/**
 * Author: Christoph Dorn <christoph@christophdorn.com>
 * [UNLICENSE](http://unlicense.org/)
 */

module.exports = function(require) {

	// We only add the method if it is not already there.
	if (typeof require.async !== "undefined") {
		return;
	}

	// We add the portable `require.async` method.
	require.async = function(id, successCallback, errorCallback) {
		var exports = null;
		try {
			exports = require(id);
		} catch(err) {
			if (typeof errorCallback === "function") {
				errorCallback(err);
			}
			return;
		}
		successCallback(exports);
		return;
	}

}
