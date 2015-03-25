'use strict';
var oErrors  = require('../main');
var Errors = oErrors.Errors;
var expect = require('expect.js');

// Create a global 'window' object (allows testing in node and browsers)
if (!global.window) {
	global.window = {};
}


describe("oErrors", function() {
	var mockRavenClient = null;
	var errors = null;

	before(function() {
		mockRavenClient = mockRaven();
		errors = new Errors(mockRavenClient, { sentryEndpoint: "testendpoint" });
	});

	after(function() {
		errors.destroy();
		errors = null;
	});

	describe("constructor(raven, options)", function() {
		it("should throw an exception if the sentryEndpoint option is missing", function() {
			expect(function() {
				new Errors(mockRavenClient, {});
			}).to.throwException();
		});

		it("should configure the raven client with the sentryEndpoint configuration option", function() {
			var errors = new Errors(mockRavenClient, {
				sentryEndpoint: "sentryendpoint"
			});

			expect(mockRavenClient.configuredEndpoint).to.equal("sentryendpoint");
		});

		it("should configure the raven client with the release version if the siteVersion option is configured", function() {
			var errors = new Errors(mockRavenClient, {
				siteVersion: "v1.0.0",
				sentryEndpoint: "test"
			});

			expect(mockRavenClient.configOptions.release).to.equal("v1.0.0");
		});

		it("should configure the log level according the the logLevel option", function() {
			var errors = new Errors(mockRavenClient, {
				sentryEndpoint: "test",
				logLevel: "contextonly"
			});

			expect(errors.logger._logLevel).to.be(1);
		});
	});

	describe("#wrapWithContext(context, function)", function() {
		it("should call Raven.wrap with context and function arguments", function() {
			var fn = function() {};
			errors.wrapWithContext({ context: "object" }, fn);

			expect(mockRavenClient.lastWrapArgs[0]).to.eql({ context: "object" });
			expect(mockRavenClient.lastWrapArgs[1]).to.eql(fn);
		});

		it("should return a function", function() {
			var fn = function() {};
			var wrappedFunction = errors.wrapWithContext({ context: "object" }, fn);
			expect(wrappedFunction).to.be.a('function');
		});
	});

	describe("#wrap(function)", function() {
		it("should call Raven.wrap with only a function argument", function() {
			var fn = function() {};
			errors.wrap(fn);
			expect(mockRavenClient.lastWrapArgs[0]).to.eql(fn);
		});

		it("should return a function", function() {
			var fn = function() {};
			var wrappedFunction = errors.wrap(fn);
			expect(wrappedFunction).to.be.a('function');
		});
	});

	describe("#_updatePayloadBeforeSend(data)", function() {
		it("should add extra log data to the argument if logging is enabled", function() {
			var errors = new Errors(mockRavenClient, {
				sentryEndpoint: "test",
				logLevel: "contextonly"
			});

			errors.log("This is a LOG line");
			errors.warn("This is a WARN line");

			var data = { extra: {} };

			var modifiedData = errors._updatePayloadBeforeSend(data);

			expect(modifiedData.extra["context:log"]).to.eql("LOG: This is a LOG line\nWARN: This is a WARN line");
		});

		it("should not add extra log data to the argument if logging is disabled", function() {
			var errors = new Errors(mockRavenClient, {
				sentryEndpoint: "test",
				logLevel: "off"
			});

			errors.log("This is a LOG line");
			errors.warn("This is a WARN line");

			var data = { extra: {} };
			var modifiedData = errors._updatePayloadBeforeSend(data);
			expect(modifiedData.extra["context:log"]).to.equal(undefined);
		});
	});

	it("should report errors on oErrors.log event", function(done) {
		mockRavenClient.captureMessage = function(error, context) {
			expect(error).to.be.an(Error);
			expect(context).to.be.an('object');
			expect(context.additional).to.equal('info');
			done();
		};

		document.dispatchEvent(new CustomEvent("oErrors.log", {
			bubbles: true,
			"detail": {
				error: new Error("My custom error"),
				info: { "additional": "info" }
			}
		}));
	});
});

function mockRaven() {
	return {
		configOptions: {},
		configuredEndpoint: "",
		installed: false,
		lastWrapArgs: [],
		lastCaptureMessageArgs: [],
		config: function(endpoint, options) {
			this.configOptions = options;
			this.configuredEndpoint = endpoint;
			return this;
		},
		install: function() {
			this.installed = true;
		},
		uninstall: function() {},
		wrap: function() {
			this.lastWrapArgs = arguments;
			var context = arguments[0];
			var func = arguments[1];

			if (func === undefined) {
				func = context;
				context = {};
			}
			return func;
		},
		captureMessage: function() {
			this.lastCaptureMessageArgs = arguments;
		}
	};
}
