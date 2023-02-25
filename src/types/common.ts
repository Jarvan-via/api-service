import { AxiosRequestConfig } from 'axios';
import { RedisOptions } from 'ioredis';
export interface LogCtx {
  msgIn?: any;
  original?: any;
  errStack?: any;
  sn: number
  ip: string
  method: string
  url: string
  brief: string
  start: number
  logLevel?: string
}

export interface HttpResponseBase<T> {
  code: number,
  message: string,
  data: T,
}

export interface EnvConfig {
  SERVICE_NAME: string;
  NODE_ENV: string;
  LOG_LEVEL: 'info' | 'error' | 'warn' | 'verbose' | 'debug';
  LOG_PATH: string;
  PORT: number;
  SERVICE: ServiceConfig
  REDIS_HOST: string,
  REDIS_PORT: number
}

export type Service = '';

export type ServiceConfig = Record<Service, AxiosRequestConfig>;
