
const ASSERT = require("assert");

require("./")(require);


function main(callback) {
	try {
		return require.async("./package.json", function(json) {

			ASSERT(typeof json, "object");
			ASSERT(json.name , "require.async");

			return require.async("./_NOT_EXIST_.json", function() {

				ASSERT.fail("We should not get here");

			}, function(err) {

				return callback(null);

			});

		}, function() {

			ASSERT.fail("We should not get here");

		});
	} catch(err) {
		return callback(err);	
	}
}


main(function(err) {
	if (err) {
		console.error(err.stack);
		process.exit(1);
	}
	console.log("OK");
	process.exit(0);
});
