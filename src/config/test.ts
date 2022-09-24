import pkg from '../../package.json';

module.exports = {
  SERVICE_NAME: pkg.name,
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: 'info',
  LOG_PATH: 'logs',
  PORT: 8889,
  REDIS: {
    host: '127.0.0.1',
    port: 6379,
  },
  SERVICE: {
  },
};