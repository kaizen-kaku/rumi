### PostgreSQL Docker Setup

This repository contains scripts to set up a PostgreSQL database in Docker.

## Prerequisites:
- Docker
- Docker Compose

## Setup:

# For Unix-based systems (Linux, macOS):
Run the following command:
./setup.sh

# For Windows:
Run the following command:
setup.bat

# Accessing the Database:
- Host: localhost
- Port: 5432
- Database: myapp
- User: myuser
- Password: mypassword

You can connect using psql or any PostgreSQL client.

# Repository Structure:
- docker-compose.yml: Defines the PostgreSQL service configuration
- init.sql: Contains initial SQL commands to create a table and insert test data
- setup.sh: Setup script for Unix-based systems
- setup.bat: Setup script for Windows systems
- README.md: This file, containing setup instructions and project information

# Usage:
1. Clone this repository
2. Ensure Docker and Docker Compose are installed on your system
3. Run the appropriate setup script for your operating system
4. Once setup is complete, you can connect to the database using the provided credentials

Note: The setup scripts will create a Docker volume named postgres-data for data persistence. If you need to start fresh, you can remove this volume using:
docker volume rm postgres-data

# Customization:
You can modify the database name, user, and password in the docker-compose.yml file. If you change these, remember to update the README and setup scripts accordingly.

# Troubleshooting:
If you encounter any issues during setup, ensure that:
1. Docker and Docker Compose are correctly installed and running
2. The required ports (5432) are not in use by other services
3. You have sufficient permissions to execute the setup scripts and run Docker commands

# To Remove Daemon Cache
```docker-compose down -v```

For any other issues, please open an issue in this repository.