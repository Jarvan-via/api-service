import pkg from '../../package.json';

module.exports = {
  SERVICE_NAME: pkg.name,
  NODE_ENV: process.env.NODE_ENV || 'dev',
  LOG_LEVEL: 'info',
  LOG_PATH: 'log',
  PORT: 8888,
  REDIS: {
    host: '127.0.0.1',
    port: 6379,
  },
};