#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Loader function
loader() {
    local pid=$1
    local delay=0.1
    local spinstr='|/-\'
    while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
        local temp=${spinstr#?}
        printf " [%c]  " "$spinstr"
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay
        printf "\b\b\b\b\b\b"
    done
    printf "    \b\b\b\b"
}

log() {
    local level=$1
    local message=$2
    case $level in
        "INFO")
            echo -e "${BLUE}[INFO]${NC} $message"
            ;;
        "WARN")
            echo -e "${YELLOW}[WARN]${NC} $message"
            ;;
        "ERROR")
            echo -e "${RED}[ERROR]${NC} $message"
            ;;
        "SUCCESS")
            echo -e "${GREEN}[SUCCESS]${NC} $message"
            ;;
    esac
}

log "INFO" "Initiating setup process"

# Check if script is run with sudo
if [ "$EUID" -ne 0 ]; then
    log "ERROR" "Please run as root or with sudo"
    exit 1
fi

# Step 0: Install Docker Compose
log "INFO" "Installing Docker Compose"
apt-get update
apt-get install -y docker-compose
if [ $? -eq 0 ]; then
    log "SUCCESS" "Docker Compose installed successfully"
else
    log "ERROR" "Failed to install Docker Compose. Exiting..."
    exit 1
fi

# Determine environment
if [ "$NODE_ENV" = "production" ]; then
    log "INFO" "Running in production mode"
    OLLAMA_URL="http://ollama:11434"
else
    log "INFO" "Running in development mode"
    OLLAMA_URL="http://localhost:11434"
fi

# Step 1: Build and start the containers
log "INFO" "Building and starting containers"
docker-compose up -d --build

# Wait for the database to be ready
log "INFO" "Initiating PostgreSQL Database"
log "INFO" "Waiting for database to come up"

# Function to test database connection
test_db_connection() {
    docker-compose exec -T db psql -U myuser -d myapp -c "SELECT 1;" > /dev/null 2>&1
    return $?
}

# Try to connect to the database multiple times
max_retries=30
count=0
while ! test_db_connection && [ $count -lt $max_retries ]; do
    log "INFO" "Waiting for database connection... Attempt $((count+1))/$max_retries"
    sleep 2
    count=$((count+1))
done

# Check if connection was successful
if test_db_connection; then
    log "SUCCESS" "Database connection successful"
else
    log "ERROR" "Failed to connect to the database after $max_retries attempts. Exiting..."
    docker-compose logs db  # Print database logs for debugging
    docker-compose down
    exit 1
fi

# Check if users table has data
log "INFO" "Checking if users table exists"
if docker-compose exec -T db psql -U myuser -d myapp -c "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users');" | grep -q 't'; then
    log "SUCCESS" "Users table exists"
    
    # Check if users table has data
    if [ "$(docker-compose exec -T db psql -U myuser -d myapp -c "SELECT COUNT(*) FROM users;" | sed -n '3p' | tr -d ' ')" -gt "0" ]; then
        log "SUCCESS" "Users table has data"
    else
        log "WARN" "Users table exists but is empty"
    fi
else
    log "WARN" "Users table does not exist"
fi

# Step 2: Pull Ollama Docker image
log "INFO" "Pulling Ollama Docker image"
if docker pull ollama/ollama; then
    log "SUCCESS" "Ollama Docker image pulled successfully"
else
    log "ERROR" "Failed to pull Ollama Docker image. Exiting..."
    docker-compose down
    exit 1
fi

# Step 3: Run Ollama container
log "INFO" "Starting Ollama container"
if docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama; then
    log "SUCCESS" "Ollama container started successfully"
else
    log "ERROR" "Failed to start Ollama container. Exiting..."
    docker-compose down
    exit 1
fi

# Step 4: Run Llama 3.1 model
log "INFO" "Initializing Llama 3.1 model"
if docker exec -it ollama ollama run llama3.1:8b; then
    log "SUCCESS" "Llama 3.1 model initialized successfully"
else
    log "ERROR" "Failed to initialize Llama 3.1 model. Exiting..."
    docker-compose down
    docker stop ollama
    docker rm ollama
    exit 1
fi

# Step 5: Update Next.js app configuration
log "INFO" "Updating Next.js app configuration to connect to Ollama"
if [ -f "./frontend/.env.local" ]; then
    echo "OLLAMA_API_URL=$OLLAMA_URL" >> ./frontend/.env.local
    log "SUCCESS" "Next.js app configuration updated"
else
    log "WARN" "Could not find .env.local file for Next.js app. Please manually set OLLAMA_API_URL=$OLLAMA_URL"
fi

log "SUCCESS" "Setup process completed successfully"
log "INFO" "You can access the app at: http://localhost:3000"
log "INFO" "Ollama is accessible at: $OLLAMA_URL"