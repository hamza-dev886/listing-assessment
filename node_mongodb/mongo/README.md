# MongoDB Node.js Assessment - TypeScript

This is a Node.js application built with TypeScript that provides statistics for active agents using MongoDB and Mongoose.

## Features

- **TypeScript**: Full TypeScript implementation with proper type definitions
- **MongoDB Integration**: Uses Mongoose for database operations
- **Aggregation Pipeline**: Complex MongoDB aggregation for statistics
- **Express.js**: RESTful API endpoints
- **Active Agents Stats**: Get statistics for active agents with their listings and views

## Project Structure

```
mongo/
├── src/
│   ├── config/
│   │   └── database.ts          # Database connection configuration
│   ├── controllers/
│   │   └── StatsController.ts   # Request handlers
│   ├── models/
│   │   ├── Agent.ts             # Agent model
│   │   ├── Listing.ts           # Listing model
│   │   └── View.ts              # View model
│   ├── routes/
│   │   └── stats.ts             # API routes
│   ├── services/
│   │   └── StatsService.ts      # Business logic
│   ├── types/
│   │   ├── index.ts             # Type definitions
│   │   └── env.d.ts             # Environment variable types
│   └── server.ts                # Main application entry point
├── build/                       # Compiled JavaScript output
├── package.json
├── tsconfig.json
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB instance
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
DB_URL=mongodb://localhost:27017/your-database
PORT=3300
NODE_ENV=development
```

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled application
- `npm run dev` - Run in development mode with hot reload

## API Endpoints

### GET /stats/active-agents

Returns statistics for active agents including:
- Agent name
- Number of listings (with price > $300,000)
- Total views for those listings

**Response Example:**
```json
[
  {
    "agent": "John Doe",
    "listings": 5,
    "totalViews": 1250
  },
  {
    "agent": "Jane Smith",
    "listings": 3,
    "totalViews": 890
  }
]
```

## Development

The application uses a modern TypeScript setup with:
- Strict type checking
- ES modules
- Modern Node.js features
- Mongoose with proper TypeScript integration

## Database Collections

The application expects three collections:
- `agent` - Agent information
- `listings` - Property listings
- `views` - View statistics for listings
