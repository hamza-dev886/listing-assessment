import express from 'express';
import StatsController from '../controllers/StatsController.js';

const router = express.Router();

router.get('/active-agents', StatsController.getActiveAgents);

export default router;