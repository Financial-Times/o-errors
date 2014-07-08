# o-errors

This module provides a decoupled events-based mechanism for modules and products to report client-side errors.

## Events

### `oErrors.error`

To be fired on a module's owned DOM or `document.body`

`details` payload may include any item from the data model (TBC). 


## API (product use only)

### `init(name, config)`

Initialise the error handler and bind to `oErrors.error` events.

* `name`: String, required. Sets a label called 'app' with this value.
* `config`: Object, optional.  Allows behaviour to be configured as follows:
  * `.isDev`: Bool. If true, enables dev mode (throw all errors to the console, do not pass to transport). Default is false.
  * `.labels`: Object. Sets custom labels to be included with any error reports
  * `.transport`: Function. Custom transport for error reports.  If set, will be called whenever an error is available, and will be passed a single argument containing data in an object conforming to the error data model.  If not set, a default internal transport will be used, which will report errors to the error routing service.
  * `captureNativeEvents`: Bool. Whether to bind to browser-native events, currently only `window.onerror`.  Default true.  If false, the module will only handle errors triggered with `oErrors.error`.

Example:

```javascript
oErrors.init("fastft", {
  isDev: true,
  captureNativeEvents: false,
  transport: myTransportFunc,
  labels: {
    version: "2.3.3"
  }
});
```
