# o-errors

This module provides a decoupled events-based mechanism for modules and products to report client-side errors.

## Events

### `oErrors.log`

To be fired on a module's owned DOM or `document.body`

`details` payload may include any item from the data model (TBC). 


## API (product use only)

### `init(name)`

Bind to `window.onerror` and `oErrors.error`.

* `name`: String, optional. Sets a label called 'app' with this value.

### `setDev(isdev)`

Switch to dev mode.  Throw all errors to the console.  Do not pass any errors to custom or built in transports.

* `isdev`: Bool, optional. If true, enables dev mode, if false, disables it.  Default is true.

### `setLabels(labels)`

Adds or replaces labels to apply to error reports

* `labels`: Object, required.  Key-value pairs to merge into the labels object.

### `setTransport(transFn)`

Configures a function to handle error reports, which will be called every time an error occurs.  When called it will be passed a single argument containing the data in an object conforming to the error data model. If a transport is not set, a built in transport will be used to send errors to a service.

Filter is a function that gets passed the detail object from the custom event to determine whether the error should be reported

* `transFn`: Function, required.  Function to handle errors, or null to revert to default built in transport.



