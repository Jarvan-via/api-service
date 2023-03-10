import log4js from 'log4js';

import config from '../config/environment';
import _ from 'lodash';

const console = { 
  type: 'console',
};
const normal = {
  type: 'dateFile',
  filename: `${config.LOG_PATH}/${config.SERVICE_NAME}.log`,
  layout: {
    type: 'pattern',
    pattern: '[%d{yyyy-MM-dd hh:mm:ss.SSS}][%p][%c] %m',
  },
  pattern: 'yyyyMMdd',
  keepFileExt: true,
  alwaysIncludePattern: true,
  level: 'INFO',
  numBackups: 7,
};

const emergencies = { 
  type: 'file', 
  filename: `${config.LOG_PATH}/${config.SERVICE_NAME}.error.log`,
  layout: {
    type: 'pattern',
    pattern: '[%d{yyyy-MM-dd hh:mm:ss.SSS}][%p][%c] %m',
  },
  pattern: 'yyyyMMdd',
  keepFileExt: true,
  alwaysIncludePattern: true,
  level: 'error',
  numBackups: 7,
};

const justError = {
  type: 'logLevelFilter',
  level: 'error',
  appender: 'emergencies',
};



const targetType = config.NODE_ENV === 'dev' ? 'console' : 'normal';

log4js.configure({
  appenders: { console, normal, justError, emergencies },
  categories: { default: { appenders: ['justError', targetType], level: 'ALL' } },
});

const logger = log4js.getLogger(config.SERVICE_NAME);
export const getLogger = (name: string) => log4js.getLogger(name);

export default logger;
