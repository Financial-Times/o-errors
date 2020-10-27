export default Logger;
/**
 * Create a new Logger class. Used internally by {@link Errors}.
 *
 * @param {Number} logSize - The default, fixed size of the log buffer.
 * @param {String} logLevel - The default log level, see the enumeration {@link Logger.level} for valid values, expects a String corresponding to a log level name.
 * @class Logger
 */
export function Logger(logSize: number, logLevel: string): void;
export class Logger {
    /**
     * Create a new Logger class. Used internally by {@link Errors}.
     *
     * @param {Number} logSize - The default, fixed size of the log buffer.
     * @param {String} logLevel - The default log level, see the enumeration {@link Logger.level} for valid values, expects a String corresponding to a log level name.
     * @class Logger
     */
    constructor(logSize: number, logLevel: string);
    _logBuffer: any[];
    _nextLogIndex: number;
    _logLevel: any;
    enabled: boolean;
    _consoleLog: typeof noop;
    out: Console | {
        log: typeof noop;
        warn: typeof noop;
        error: typeof noop;
    };
    error(...args: any[]): void;
    log(...args: any[]): void;
    warn(...args: any[]): void;
    append(logLine: any): void;
    private logLines;
}
export namespace Logger {
    namespace level {
        const off: number;
        const contextonly: number;
        const debug: number;
        const consoleonly: number;
    }
    /**
     * *
     */
    type level = number;
}
declare function noop(): void;
