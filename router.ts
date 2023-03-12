import express from 'express';
import pingRouter from './src/controller/ping';
import openaiRouter from './src/controller/openai';
const router = express.Router();
router.use('/ping', pingRouter);
router.use('/ai', openaiRouter);


export default router;
