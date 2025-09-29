import { Request, Response } from 'express';
import StatsService from '../services/StatsService.js';

class StatsController {
  static async getActiveAgents(req: Request, res: Response): Promise<void> {
    try {
      const stats = await StatsService.getActiveAgentsStats();
      
      res.status(200).json(stats);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error in getActiveAgents:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: errorMessage
      });
    }
  }
}

export default StatsController;