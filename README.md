require.async
=============

[![Build Status](https://secure.travis-ci.org/pinf/require.async.png)](https://travis-ci.org/pinf/require.async)


What
----

`require.async` is a module that patches the `require` given to your module by the NodeJS module system.

It adds the method `require.async(id, function success(exports), function error(err))` which you can use
instead of `require("<id>")` to indicate entry into an optional / conditional / rare segment of the program.

All plugin loaders for example should be using `require.async` to asynchronously load plugins.


Install
-------

    npm install require.async


Usage
-----

`package.json`

    {
        "name": "test"
    }

`main.js`

    require("require.async")(require);

    require.async("./package.json", function(info) {
        console.log(JSON.stringify(json));
    })l

Run:

    $ node main.js
    {"name": "test"}


Background
----------

[NodeJS](http://nodejs.org/) has a synchronous [`require()`](http://nodejs.org/api/globals.html#globals_require) because its module loading
system is synchronous.

This works because NodeJS runs on the server which means IO calls to fetch module code will be fast (< 10 ms).

**But not all module loading systems are synchronous.**

Almost all module loading systems designed for the browser are **asynchronous** for the express purpose of working around higher IO latencies
and keeping runtime sizes smaller. They do this by allowing for **incremental loading** of resources and in our case **code bundles**.

Code bundles are sets of statically linked modules that (`exports = require("<id>")`) each other.

One bundle can require another bundle using `require.async(id, function success(exports), function error(err))`. Notice how
we are making an asynchronous call to fetch the next segment of the program we need to execute.

This approach of composing a program into bundles where one root bundle loads other bundles (which may load further bundles)
is considered best practice and achieved in different ways by various toolchains.

**All toolchains and runtimes can benefit from `require.async()` used by a developer (instead of `require()`) to indicate
entry into an OPTIONAL / CONDITIONAL / RARE segment of the program. Programs written in this fashion are more portable.**

The `require.async` method is inspired by [CommonJS](http://wiki.commonjs.org/wiki/Modules/Async/A) and supported by
the [PINF JavaScript Loader](https://github.com/pinf/pinf-loader-js) which can load code bundles conflict free into
any modern JavaScript runtime.


License
=======

Author: [Christoph Dorn](http://christophdorn.com/)
License: [UNLICENSE](http://unlicense.org/)
