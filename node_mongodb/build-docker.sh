#!/bin/bash

echo "🐳 Building Node.js MongoDB Assessment Docker Image..."

# Build the Docker image
docker build -t node-assessment-mongodb .

echo "✅ Docker image built successfully!"
echo ""
echo "🚀 To run the container:"
echo "docker run -d -p 3300:3300 -p 27017:27017 --name node-assessment-app node-assessment-mongodb"
echo ""
echo "🧪 To test the API:"
echo "curl http://localhost:3300/stats/active-agents"
echo ""
echo "📊 To access MongoDB:"
echo "docker exec -it node-assessment-app mongo -u root -p Admin123 --authenticationDatabase admin"