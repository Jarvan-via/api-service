import express from 'express';
import Joi from 'joi';

import { resJSON, reqHandler } from '../utils/helper';
import Err from '../enums/code';

import { getChatCompletion, getCompetition, imageGenerations } from '../service/openai';

const router = express.Router();

const OpenaiRequestSchema = Joi.object({
  requestType: Joi.string().required(),
  prompt: Joi.string().required(),
  funcType: Joi.string().required(),
});


router.post('/openai', reqHandler(async (req, res) => {
  const { requestType, prompt, funcType } = await OpenaiRequestSchema.validateAsync(req.body);

  let response: string;

  switch (funcType) {
    case 'competition':
      response = await getCompetition(prompt, requestType);
      break;
    case 'chatCompetition':
      response = await getChatCompletion(prompt, requestType);
      break;
    default:
      break;
  }

  return res.json(resJSON(Err.CODE.SUCCESS, 'success', response, req.logCtx));
}));


const imageSchema = Joi.object({
  requestType: Joi.string().required(),
  prompt: Joi.string().required(),
});
router.post('/image', reqHandler(async (req, res) => {
  const { requestType, prompt } = await imageSchema.validateAsync(req.body);

  const imageUrl = await imageGenerations(prompt, requestType);

  return res.json(resJSON(Err.CODE.SUCCESS, 'success', imageUrl, req.logCtx));
}));

export default router;