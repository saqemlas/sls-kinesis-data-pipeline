import {createLogger, format, Logger, transports} from 'winston';
import {Context} from 'aws-lambda';
import {Log, LoggingOptions} from '../types/logger';

const loggerBase: Logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.IS_LOCAL ? format.combine(format.colorize(), format.align(), format.simple()) : format.json(),
    transports: [
        new transports.Console(),
    ],
});

const loggerWrapper = (logger: Logger): Log => ({
    debug: (msg: string, data?: Record<string, unknown>): Logger => logger.debug(msg, {data}),
    info: (msg: string, data?: Record<string, unknown>): Logger => logger.info(msg, {data}),
    warn: (msg: string, data?: Record<string, unknown>): Logger => logger.warn(msg, {data}),
    error: (msg: string, data?: Record<string, unknown>): Logger => logger.error(msg, {data}),
    winston: logger,
});

function setupLogger (context?: Context, options?: LoggingOptions): void {
    loggerBase.defaultMeta = {requestId: context?.awsRequestId};

    if (options?.utilLogsLevel) {
        loggerBase.level = options.utilLogsLevel;
    }
};

const logger: Log = loggerWrapper(loggerBase.child({}));

export {setupLogger, logger};
