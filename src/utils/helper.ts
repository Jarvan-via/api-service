import { Request, Response, RequestHandler, NextFunction } from 'express';
import { AxiosResponse } from 'axios';

import logger from './logger';
import config from '../../src/config/environment';
import Err from '../enums/code';
import { LogCtx, HttpResponseBase } from '../types/common';

const SYSTEM_ID = config.SYSTEM_ID * 1000;

const entry = (req: Request, res: Response, next: NextFunction) => {
  // inject ip behind Nginx
  // Note: we cannot overwrite req.ip: http://stackoverflow.com/a/33113848/1548043
  req.logCtx = {
    sn: getSN(),
    ip: req.ip,
    method: req.method,
    url: req.url,
    brief: 'success',
    start: Date.now(),
  };
  next();
};

const entryLog = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`[SN_${req.logCtx.sn}]${req.method} ${req.url} from ${req.ip} with query ${JSON.stringify(req.query)} and body ${JSON.stringify(req.body)}`);
  next();
};

let sn = 0;
function getSN() {
  if (sn > 100000) sn = 0;
  return sn++;
}

/**
 * 生成JSON的返回值并打印log
 * @param {Number} code
 * @param {String} message
 * @param {Object} data Data object would be returned to the user
 * @param {Object} logCtx
 * @param {String} [brief=success]
 * @param {String} [logLevel=info]
 * @returns {{code: *, message: *, data: *}}
 */
const resJSON = (code: number, message: string, data: any, logCtx: LogCtx, brief: string = 'success', logLevel: string = 'info'): { code: number; message: string; data: any; } => {
  const result = {
    code: code && code < 1000 ? code + SYSTEM_ID : code,
    message,
    data: data,
  };
  logCtx.brief = logCtx.brief || brief;

  if (logCtx) {
    let sn = '', timeCost = '';
    if (process.env.FULL_LOG !== 'off') {
      sn = logCtx.sn !== undefined ? `[SN_${logCtx.sn}]` : '';
    }
    if (logCtx.start) {
      timeCost = `in ${Date.now() - logCtx.start} ms==`;
    }
    logger.log(logCtx.logLevel || logLevel, (`${sn}==code:${result.code}==errMsg:${JSON.stringify(logCtx)}==${timeCost}`));
  } else {
    logger.error('No log context on' + code);
  }
  return result;
};

const reqHandler = function reqHandler(handler: RequestHandler) {
  return async (req: Request, resp: Response, next: NextFunction) => {
    try {
      await handler(req, resp, next);
    } catch (e) {
      next(e);
    }
  };
};

async function sleep(time: number) {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

const handler = function handler<T>({ data: { code, message, data } }: AxiosResponse<HttpResponseBase<T>>): T {
  if (code !== Err.CODE.SUCCESS && code !== Err.CODE.NOT_EXISTS && code !== 200) {
    throw Err(code, null, message);
  }
  return data;
};


export {
  entry,
  resJSON,
  reqHandler,
  entryLog,
  sleep,
  handler,
};