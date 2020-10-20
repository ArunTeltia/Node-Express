export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = (process.env.PORT && parseInt(process.env.PORT)) || 5000;
export const LOG_LEVEL = process.env.LOG_LEVEL || 'silly'; // This log level should be compliant with winston log levels
