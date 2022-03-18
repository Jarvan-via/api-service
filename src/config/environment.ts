import _ from 'lodash';

import { EnvConfig } from '../types/common';


/** 从环境变量中获取参数并校验和转换 */
function getEnvConfig(): EnvConfig {
  const env = process.env.NODE_ENV || 'dev'
  const configPath = `./${env}.${env === 'dev' ? 'ts' : 'js'}`;


  let envConfig: any;
  try {
    envConfig = _.extend(require(configPath), {});
  } catch (e) {
    // console.warn(e);
    envConfig = require(configPath);
  }

  envConfig.SYSTEM_ID = 90;

  return envConfig;
}
const envConfig = getEnvConfig();
export default envConfig;
