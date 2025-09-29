# Multi-stage Docker build for Node.js MongoDB Assessment

# Stage 1: Base image with MongoDB and Node.js
FROM ubuntu:22.04

# Set environment variables
ENV NODE_VERSION=18.17.0
ENV MONGODB_VERSION=7.0
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    gnupg \
    software-properties-common \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install MongoDB
RUN wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add - \
    && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list \
    && apt-get update \
    && apt-get install -y mongodb-org \
    && rm -rf /var/lib/apt/lists/*

# Create MongoDB data directory
RUN mkdir -p /data/db && chown -R mongodb:mongodb /data/db

# Create application directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application source code
COPY . .

# Create MongoDB configuration
RUN mkdir -p /etc/mongodb
COPY <<EOF /etc/mongodb/mongod.conf
storage:
  dbPath: /data/db
  journal:
    enabled: true

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

net:
  port: 27017
  bindIp: 0.0.0.0

security:
  authorization: enabled

setParameter:
  authenticationMechanisms: SCRAM-SHA-1,SCRAM-SHA-256
EOF

# Create MongoDB initialization script
COPY <<EOF /usr/src/app/init-mongo.js
// MongoDB initialization script
use admin;

// Create root user
db.createUser({
  user: "root",
  pwd: "Admin123",
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" }
  ]
});

// Switch to application database
use node_assement;

// Create application user
db.createUser({
  user: "appuser",
  pwd: "apppass",
  roles: [
    { role: "readWrite", db: "node_assement" }
  ]
});

// Create collections
db.createCollection('agent');
db.createCollection('listings');
db.createCollection('views');

// Insert sample data
db.agent.insertMany([
  { _id: 101, name: "Alice Smith", active: true },
  { _id: 102, name: "Bob Johnson", active: false },
  { _id: 103, name: "Carol Lee", active: true }
]);

db.listings.insertMany([
  { _id: 1, title: "Modern Apartment", city: "New York", agentId: 101, price: 250000 },
  { _id: 2, title: "Cozy Suburban Home", city: "Chicago", agentId: 102, price: 320000 },
  { _id: 3, title: "Luxury Condo", city: "New York", agentId: 103, price: 450000 }
]);

db.views.insertMany([
  { listingId: 1, date: "2025-09-01", views: 100 },
  { listingId: 1, date: "2025-09-10", views: 80 },
  { listingId: 2, date: "2025-09-05", views: 50 },
  { listingId: 3, date: "2025-09-08", views: 200 }
]);

print('Database initialized with sample data');
EOF

# Create supervisor configuration
COPY <<EOF /etc/supervisor/conf.d/supervisord.conf
[supervisord]
nodaemon=true
user=root

[program:mongodb]
command=/usr/bin/mongod --config /etc/mongodb/mongod.conf
autostart=true
autorestart=true
stderr_logfile=/var/log/mongodb/mongod.err.log
stdout_logfile=/var/log/mongodb/mongod.out.log
user=mongodb

[program:node-app]
command=/usr/bin/node server.js
directory=/usr/src/app
autostart=true
autorestart=true
stderr_logfile=/var/log/node-app.err.log
stdout_logfile=/var/log/node-app.out.log
environment=NODE_ENV=production,PORT=3300,DB_URL="mongodb://root:Admin123@localhost:27017/node_assement?authSource=admin&readPreference=primary&ssl=false"
user=root
EOF

# Create startup script
COPY <<EOF /usr/src/app/startup.sh
#!/bin/bash

# Create log directories
mkdir -p /var/log/mongodb
chown mongodb:mongodb /var/log/mongodb

# Start MongoDB in background
mongod --config /etc/mongodb/mongod.conf --fork

# Wait for MongoDB to start
sleep 10

# Initialize MongoDB with data
mongo < /usr/src/app/init-mongo.js

# Stop MongoDB to let supervisor manage it
mongod --shutdown

# Start supervisor
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
EOF

# Make startup script executable
RUN chmod +x /usr/src/app/startup.sh

# Create log directories
RUN mkdir -p /var/log/mongodb && \
    chown mongodb:mongodb /var/log/mongodb

# Expose ports
EXPOSE 3300 27017

# Set environment variables for the application
ENV NODE_ENV=production
ENV PORT=3300
ENV DB_URL=mongodb://root:Admin123@localhost:27017/node_assement?authSource=admin&readPreference=primary&ssl=false

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:3300/ || exit 1

# Start services using startup script
CMD ["/usr/src/app/startup.sh"]