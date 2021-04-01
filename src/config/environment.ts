import _ from 'lodash';

import pkg from '../../package.json';
import { EnvConfig } from '../types/common';


/** 从环境变量中获取参数并校验和转换 */
function getEnvConfig(): EnvConfig {
  const cicdConfigPath = `/yinhe/apps/config/${pkg.name}/environment`;
  const configPath = `./${process.env.NODE_ENV || 'dev'}.ts`;


  let envConfig: any;
  try {
    envConfig = _.extend(require(configPath), require(cicdConfigPath));
  } catch (e) {
    // console.warn(e);
    envConfig = require(configPath);
  }

  envConfig.SYSTEM_ID = 90;

  return envConfig;
}
const envConfig = getEnvConfig();
export default envConfig;
