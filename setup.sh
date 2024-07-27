#!/bin/bash

# Step 1: Build and start the containers
echo "Building and starting containers..."
docker-compose up -d --build

# Wait for the database to be ready
echo "Initiating PostgreSQL Database. Waiting for database to come up..."
sleep 20

# Test the database connection
echo "Testing database connection..."
docker-compose exec db psql -U myuser -d myapp -c "SELECT 1;"

if [ $? -eq 0 ]; then
    echo "Database connection successful."
else
    echo "Database connection failed. Exiting..."
    docker-compose down
    exit 1
fi

# Check if users table has data
echo "Checking if users have been inserted..."
docker-compose exec db psql -U myuser -d myapp -c "SELECT * FROM users;"

if [ $? -eq 0 ]; then
    echo "Users table accessed successfully."
else
    echo "Failed to access users table. It may be empty or not exist."
    # Uncomment the following lines if you want to exit on this failure
    # docker-compose down
    # exit 1
fi

echo "Setup complete. Database and NextJS app are running."
echo "You can access the app at http://localhost:3000"