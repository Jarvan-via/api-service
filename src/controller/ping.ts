import express from 'express';


import { resJSON, reqHandler } from '../utils/helper';
import Err from '../enums/code';

const router = express.Router();

router.all('/', reqHandler(async (req, res) => {
  return res.json(resJSON(Err.CODE.SUCCESS, 'success', null, req.logCtx));
}));

export default router;