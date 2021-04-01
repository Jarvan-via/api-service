import pkg from '../../package.json';

module.exports = {
  SERVICE_NAME: pkg.name,
  NODE_ENV: process.env.NODE_ENV || 'dev',
  LOG_LEVEL: 'info',
  LOG_PATH: 'log',
  PORT: 8888,
  REDIS: {
    host: '172.16.8.161',
    port: 56379,
  },
  SERVICE: {
    'cmd-list-manager': {
      baseURL: 'http://cmd-list-manager.test.yhroot.com',
    },
  },
};