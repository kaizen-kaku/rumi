#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
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

echo -e "${MAGENTA}=======================================${NC}"
echo -e "${CYAN}Setup Process Initiated ${NC}"
echo -e "${MAGENTA}=======================================${NC}"

# Step 1: Build and start the containers
echo -e "\n${YELLOW}Building and starting containers...${NC}"
docker-compose up -d --build

# Wait for the database to be ready
echo -e "\n${BLUE}Initiating PostgreSQL Database...${NC}"
echo -e "${CYAN}Waiting for database to come up...${NC}"
(sleep 20) &
loader $!

# Test the database connection
echo -e "\n${YELLOW}Testing database connection...${NC}"
docker-compose exec db psql -U myuser -d myapp -c "SELECT 1;" > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Database connection successful.${NC}"
else
    echo -e "${RED}Database connection failed. Exiting...${NC}"
    docker-compose down
    exit 1
fi

# Check if users table has data
echo -e "\n${YELLOW}Checking if users have been inserted...${NC}"
docker-compose exec db psql -U myuser -d myapp -c "SELECT * FROM users;" > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Users table accessed successfully.${NC}"
else
    echo -e "${RED}Failed to access users table. It may be empty or not exist.${NC}"
    # Uncomment the following lines if you want to exit on this failure
    # docker-compose down
    # exit 1
fi

echo -e "\n${GREEN}=======================================${NC}"
echo -e "${CYAN}🎉 Setup complete!${NC}"
echo -e "${GREEN}=======================================${NC}"
echo -e "${MAGENTA}You can access the app at:${NC} ${YELLOW}http://localhost:3000${NC}"
echo -e "${BLUE}Happy coding!${NC}"