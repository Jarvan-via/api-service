import express from 'express';
import pingRouter from './src/controller/ping';
const router = express.Router();
router.use('/ping', pingRouter);

export default router;
