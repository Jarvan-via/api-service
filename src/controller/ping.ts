import express from 'express';
import Joi from 'joi';

import config from '../config/environment';
import { resJSON, reqHandler, handler } from '../utils/helper';
import Err from '../enums/code';
import env from '../utils/env';

const router = express.Router();

router.all('/', reqHandler(async (req, res) => {
  return res.json(resJSON(Err.CODE.SUCCESS, 'success', process.env, req.logCtx));
}));

const exampleSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().less(35),
  skills: Joi.array().items(Joi.valid(...['java', 'nodejs', 'python'])),
});

interface ExampleValue {
  name: string,
  age: number,
  skills: string[],
}

router.all('/example', reqHandler(async (req, res) => {
  const { name, age, skills }: ExampleValue = await exampleSchema.validateAsync(req.body);

  const config = await env._serv['cmd-list-manager'].post('/ping').then(handler);

  return res.json(resJSON(Err.CODE.SUCCESS, 'success', { name, age, skills, config }, req.logCtx));
}));

router.all('/', reqHandler(async (req, res) => {
  // 在这里写代码

  return res.json(resJSON(Err.CODE.SUCCESS, 'success', null, req.logCtx));
}));

export default router;