import mongoose from 'mongoose';

class Database {
  static async connect(): Promise<void> {
    try {
      const dbUrl = process.env.DB_URL;
      if (!dbUrl) {
        throw new Error('DB_URL environment variable is not set');
      }
      
      const conn = await mongoose.connect(dbUrl);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Database connection error:', errorMessage);
      process.exit(1);
    }
  }
}

export default Database;