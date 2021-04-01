import express, { ErrorRequestHandler, RequestHandler, Router } from 'express';
import bodyParser from 'express';

import Err from './src/enums/code';
import { entry, resJSON, entryLog } from './src/utils/helper';

const app = express();

const businessErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.code) {
    if (process.env.FULL_LOG !== 'off' || err.code !== Err.CODE.PARAMS_INVALID) req.logCtx.errStack = err.stack;
    if (err.original) req.logCtx.original = err.original;
    return res.json(resJSON(err.code, err.message, null, req.logCtx));
  }

  if (err.isJoi) {
    res.status(200);
    req.logCtx.msgIn = err.message;
    return res.json(resJSON(Err.CODE.PARAMS_INVALID, err.message, null, req.logCtx));
  }

  return next(err);
};

const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404);
  const logCtx = req.logCtx;
  logCtx.brief = 'IN uri error: ' + req.originalUrl;
  logCtx.logLevel = 'error';
  logCtx.msgIn = 'Not Found';
  return res.json(resJSON(Err.CODE.NOT_FOUND, 'Not Found', null, req.logCtx));
};

const internalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500);
  const logCtx = req.logCtx;
  logCtx.brief = 'IN uri error: ' + req.originalUrl;
  logCtx.logLevel = 'error';

  logCtx.errStack = err.stack || err;
  return res.json(resJSON(Err.CODE.UNKNOWN, '内部错误', null, logCtx));
};

export default function getApp(router: Router) {
  app.use('*', entry);

  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.raw({ limit: '10mb' }));

  if (process.env.FULL_LOG !== 'off') {
    app.all('*', entryLog);
  }

  app.use(router);
  app.use(businessErrorHandler);

  app.use(notFoundHandler);

  app.use(internalErrorHandler);
  return app;
}