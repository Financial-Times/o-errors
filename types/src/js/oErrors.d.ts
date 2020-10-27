export default Errors;
/**
 * @class Errors
 */
export function Errors(): void;
export class Errors {
    ravenClient: any;
    /**
     * The initialised state of the object.
     * @type {bool}
     */
    initialised: any;
    logger: Logger;
    _logEventHandler: any;
    _errorBuffer: any[];
    _declarativeConfigString: boolean;
    _filterError: () => boolean;
    _transformError: (data: any) => any;
    init(options: {
        sentryEndpoint: string;
        siteVersion: string;
        environment: string;
        logLevel: string;
        disabled: boolean;
        buffer: any[];
    }, raven: any): Errors;
    report: (error: any) => any;
    wrapWithContext: (context: any, fn: any) => any;
    _configureAndInstallRaven(options: any, raven: any): void;
    private _flushBufferedErrors;
    error(...args: any[]): undefined;
    warn(...args: any[]): undefined;
    log(...args: any[]): undefined;
    wrap(fn: Function): Function;
    destroy(): undefined;
    handleLogEvent(ev: any): void;
    private _getEventPath;
    private _updatePayloadBeforeSend;
    private _hasDeclarativeConfig;
    private _getDeclarativeConfig;
    private _initialiseDeclaratively;
}
import Logger from "./logger.js";
