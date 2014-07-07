Starred items are required:

```
{
	*title: <string: Error description>,
	*time: <string: ISO8601 including TZ>,
	*source: {
	  file: <string>,
	  line: <integer>,
	  char: <integer>,
	  object: <string>,
	  domElement: <string: xpath>
	},
	*type: <string: Error type>,
	context: <any data>,
	labels: {
		app: <scalar>,
		component: <scalar>,
		<string>: <scalar>,
		...
	},
	request: {
		url: <string>,
		referrer: <string>,
		useragent: <string>
	},
	backtrace: <array>
};
```

Main points:

* Custom data can be added to the `labels` or `context` properties (labels for data about the enviornment and context for a dump of data in local scope)
* No user agent analysis on the client.  Better to do that on the server.
