#!/bin/bash

# Step 1: Start the database container
echo "Starting the database container..."
docker compose up -d db

# Wait for the database to be ready
echo "Waiting for PostgreSQL database to initialize..."
sleep 10  # Wait time for spin up

# Test the database connection
echo "Testing database connection..."
docker compose exec db psql -U myuser -d myapp -c "SELECT 1;" || exit 1

echo "Database connection successful."

# Print the full table of users
echo "Printing the full table of users..."
docker compose exec db psql -U myuser -d myapp -c "SELECT * FROM users;"

echo "Database setup complete."
echo "The PostgreSQL database is now running and accessible."