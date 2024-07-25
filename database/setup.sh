# Start the containers
docker-compose up -d

# Wait for the database to be ready
echo "Initiating PostgreSQL Database. Waiting for database to come up..."
sleep 10

# Test the connection
echo "Testing connection to PostgreSQL Database"
docker exec postgres-db psql -U myuser -d myapp -c "SELECT * FROM users;"

echo "Setup complete. PostgreSQL is ready to use."