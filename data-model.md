Starred items are required:

```
{
	*title: <string: Error description>,
	*time: {
		client: <string: ISO8601 including TZ>,
		server: <string: ISO8601 including TZ>
	},
	*source: {
		file: <string>,
		line: <integer>,
		char: <integer>,
		object: <string>,
		domElement: <string: xpath>
	},
	type: <string: Error type>,
	*severity: <string: syslog severity level>,
	globals: {
		<string>: <any data>,
		...
	},
	parent: <object: another error data package>
	labels: {
		app: <scalar>,
		component: <scalar>,
		environment: PROD|STAGE|INT|CI|DEV,
		eh:tolerance: <string>,
		eh:aggregateas: <string>,
		<string>: <scalar>,
		...
	},
	request: {
		url: <string>,
		referrer: <string>,
		useragent: <string>,
		headers: <object>,
		get: <object>,
		post: <object>,
		cookies: <object>
	},
	rawtrace: <string>,
	trace: [
		{
			file:"foo", 
			line:31,
			char:1, 
			function:"err", 
			class:"Foo", 
			object: <object: reference>, // This is available in PHP, prob not in JS
			args: [...]
			code: {29:"", 30:"function foo() {", 31: "   err();", 32:"}"}
			context: <object: vars defined in this scope>
		},
		...
	],
	schema_version: 1
};
```

Main points:

* Custom data can be added to `labels` or the `context` properties of backtrace steps.
* No user agent analysis on the client.  Better to do that on the server.
