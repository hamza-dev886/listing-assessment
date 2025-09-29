# Node Assessment

This project is a Node.js REST API for managing real estate listings and agents, built with **TypeScript**, Express, Prisma ORM, and MySQL. It supports CRUD operations for property listings, with agent association and validation.

## Features
- **TypeScript** for type safety and better development experience
- Create, read, update, and delete property listings
- Each listing is associated with an agent
- **Input validation** using `express-validator` with centralized validator functions
- **Error handling** with custom responses and proper TypeScript error types
- **MySQL database integration** via Prisma ORM with TypeScript support
- **Docker support** for MySQL database and Node.js application
- **Modular architecture** with separated concerns (controllers, services, validators, types)

## Project Structure
```
node_assesment/
├── docker-compose.yml         # Docker config for MySQL only
├── docker-compose-app.yml     # Docker config for MySQL and Node.js app
├── Dockerfile                 # Docker config for Node.js TypeScript app
├── package.json               # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration with decorators
├── nodemon.json              # Nodemon configuration for TypeScript development
├── .gitignore                # Git ignore file for TypeScript project
├── prisma/
│   ├── schema.prisma          # Prisma schema definition
│   └── migrations/            # Prisma migration files
├── src/                       # TypeScript source files
│   ├── index.ts               # Express app entry point
│   ├── controllers/
│   │   └── listingController.ts  # Request handlers with TypeScript types
│   ├── middlewares/           # (empty - for future middleware)
│   ├── routes/
│   │   ├── index.ts           # Main router
│   │   └── listingRoutes.ts   # Listing routes with validation
│   ├── services/
│   │   └── listingService.ts  # Business logic with Prisma integration
│   ├── types/
│   │   └── listingInput.ts    # TypeScript interfaces and types
│   ├── utils/
│   │   └── errorResponse.ts   # Error handling utilities
│   └── validators/
│       └── listingValidator.ts # Express-validator validation rules
├── dist/                      # Compiled JavaScript output (auto-generated)
└── tests/                     # (empty - for future tests)
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Docker and Docker Compose
- TypeScript knowledge recommended

### Local Development Setup
1. **Clone the repository**
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment:**
   - Ensure `.env` file exists with database credentials
4. **Start MySQL with Docker:**
   ```sh
   docker-compose up -d  # MySQL only
   ```
5. **Run Prisma migrations:**
   ```sh
   npx prisma migrate deploy
   npx prisma generate
   ```
6. **Build TypeScript:**
   ```sh
   npm run build
   ```
7. **Start the development server:**
   ```sh
   npm run dev  # Development with hot reload and ts-node
   # or
   npm start    # Production mode (requires build first)
   ```

### Using Docker

#### Production (Full Application)
To run the entire application (MySQL + Node.js app) with Docker:
```sh
docker-compose -f docker-compose-app.yml up --build
```

#### Development with Docker
For development with hot reload:
```sh
docker-compose -f docker-compose.dev.yml up --build
```

#### Database Only
To run only MySQL database:
```sh
docker-compose up -d
```

**Docker Features:**
- **Multi-stage builds** for optimized production images
- **Health checks** for both database and application
- **Hot reload** support in development mode
- **Automatic migrations** on container startup
- **Non-root user** for security in production

## Development Scripts
- `npm run build` - Compile TypeScript to JavaScript (output: `dist/`)
- `npm run dev` - Start development server with hot reload using ts-node and nodemon
- `npm start` - Start production server (requires `npm run build` first)

## Validation
The application uses **express-validator** for input validation:
- **Centralized validation rules** in `/src/validators/listingValidator.ts`
- **Type-safe validation** with TypeScript interfaces
- **Custom error handling** for validation failures
- **Reusable validators** across different routes

## API Endpoints
All endpoints are prefixed with `/api`.

### Listings
- `POST   /api/listings/create`     - Create a new listing
- `GET    /api/listings/get`        - Get all listings
- `GET    /api/listings/get/:id`    - Get a listing by ID
- `PUT    /api/listings/update/:id` - Update a listing (agent only)
- `DELETE /api/listings/delete/:id` - Delete a listing (agent only)

## Environment Variables
See `.env` for DB connection details:
```
DATABASE_URL="mysql://node_assessment:Admin123@localhost:3306/node_assessment"
DB_NAME=node_assessment
DB_USER=node_assessment
DB_PASSWORD=Admin123
DB_HOST=localhost
```

## Database
- Uses MySQL (via Docker)
- Prisma ORM for schema and migrations

## TypeScript Configuration
- **Strict type checking** enabled for better code quality
- **ESModule support** with modern import/export syntax
- **Experimental decorators** support (for future DI implementation)
- **Compiled output** in `dist/` directory
- **Source maps** and proper module resolution
- **Type definitions** for all dependencies (@types/express, @types/node)

## Architecture Highlights
- **Separation of Concerns**: Controllers handle HTTP, Services handle business logic
- **Type Safety**: All entities and DTOs are properly typed with TypeScript interfaces
- **Centralized Validation**: Express-validator rules are organized in dedicated validator files
- **Error Handling**: Custom error response utilities with proper HTTP status codes
- **Database Integration**: Prisma ORM with TypeScript-first approach

## Docker Files
- `docker-compose.yml` - MySQL database only
- `docker-compose-app.yml` - Production setup (MySQL + App)
- `docker-compose.dev.yml` - Development setup with hot reload
- `Dockerfile` - Multi-stage production build
- `Dockerfile.dev` - Development build with ts-node

## Docker Configuration Features
- **Multi-stage builds** for efficient TypeScript compilation
- **Health checks** for database and application connectivity
- **Volume mounting** for development with hot reload
- **Environment variable** management for different environments
- **Automatic Prisma migrations** on container startup
- **Security** with non-root user in production

## License
ISC
