#!/bin/bash

# Step 1: Build and start the containers
echo "Building and starting containers..."
docker compose up -d --build

# Wait for the database to be ready
echo "Initiating PostgreSQL Database. Waiting for database to come up..."
sleep 10  # Wait time for spin up

# Test the database connection
echo "Testing database connection..."
docker compose exec db psql -U myuser -d myapp -c "SELECT 1;" || exit 1

echo "Database connection successful."

# Print the full table of users
echo "Printing the full table of users..."
docker compose exec db psql -U myuser -d myapp -c "SELECT * FROM users;"

echo "Setup complete. Database and NextJS app are running."
echo "You can access the app at http://localhost:3000"
