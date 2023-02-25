import * as dotenv from 'dotenv';
dotenv.config({ path: `./env/.${process.env.NODE_ENV || 'dev'}.env` });
import config  from './src/config/environment';
import router from './router';

import getApp from './app';
import pck from './package.json';
import init from './init';
import logger from './src/utils/logger';

(async function main() {
  await init();
  
  const app = getApp(router);

  const server = app.listen(config.PORT, () => {
    logger.info(`Startup ${pck.name} in env ${config.NODE_ENV} on port ${config.PORT}`);
  });

  server.on('error', (e) => {
    logger.error(e);
  });  
})();