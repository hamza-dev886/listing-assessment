import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Database from './config/database.js';
import statsRoutes from './routes/stats.js';

dotenv.config();

class Server {
  private app: Application;
  private PORT: number;

  constructor() {
    this.app = express();
    this.PORT = parseInt(process.env.PORT || '3300', 10);
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    this.app.use('/stats', statsRoutes);

    this.app.get('/', (req: Request, res: Response) => {
      res.json({ 
        message: 'Node.js MongoDB Assessment API',
        status: 'Running',
        port: this.PORT 
      });
    });
  }

  private setupErrorHandling(): void {
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
      });
    });

    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).json({ error: 'Route not found' });
    });
  }

  async start(): Promise<void> {
    try {
      await Database.connect();
      
      this.app.listen(this.PORT, () => {
        console.log(`Server is running on port ${this.PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  }
}

const server = new Server();
server.start();