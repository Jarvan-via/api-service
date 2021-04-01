import { AxiosInstance } from 'axios';
import { Redis } from 'ioredis';

import { Service } from '../types/common';

type AxiosServices = Partial<Record<Service, AxiosInstance>>;

const env: {
  _serv?: AxiosServices,
  _redis?: Redis,
} = { _serv: {} };

export default env;