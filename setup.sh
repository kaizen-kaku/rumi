#!/bin/bash

# Step 1: Build and start the database and Ollama containers
echo "Building and starting database and Ollama containers..."
docker compose up -d --build db ollama

# Wait for the database and Ollama to be ready
echo "Initiating PostgreSQL Database and Ollama. Waiting for services to come up..."
sleep 10  # Wait time for spin up

# Test the database connection
echo "Testing database connection..."
docker compose exec db psql -U myuser -d myapp -c "SELECT 1;" || exit 1

echo "Database connection successful."

# Start Ollama model
echo "Starting Ollama model..."
docker compose exec ollama ollama run llama3.1:8b

# Print the full table of users
echo "Printing the full table of users..."
docker compose exec db psql -U myuser -d myapp -c "SELECT * FROM users;"

# Step 2: Build and start the app container
echo "Building and starting app container..."
docker compose up -d --build app

echo "Setup complete. Database, Next.js app, and Ollama are running."
echo "You can access the app at http://localhost:3000"
