import { configure, getLogger } from 'log4js';

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
};

const logger = getLogger(config.SERVICE_NAME);

const targetType = _.isEqual(config.NODE_ENV, 'dev') ? 'console' : 'normal';

configure({
  appenders: { console, normal },
  categories: { default: { appenders: [targetType], level: config.LOG_LEVEL } },
});

export default logger;
