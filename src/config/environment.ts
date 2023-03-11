import _ from 'lodash';

import { EnvConfig } from '../types/common';


function getEnvConfig(): EnvConfig {
  const env = process.env.NODE_ENV || 'dev';
  const configPath = `./${env}`;


  const envConfig = _.extend(require(configPath), process.env);
  // console.log(envConfig)
  return envConfig;
}
const envConfig = getEnvConfig();

export default envConfig;
