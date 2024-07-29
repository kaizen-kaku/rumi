# Rumi

## About
Meet Rumi, the powerhouse that brings cutting-edge local language model (LLM) capabilities right to your fingertips! With Rumi, your business can harness the full potential of LLMs, ensuring top-notch internal security and seamless management.

## Key Features:

- Local Model Hosting: Run your LLMs locally with full control and unparalleled security, keeping your data in-house and your processes smooth.
- Tool Calling: Integrate and utilize various tools effortlessly, all within Rumi’s intuitive interface.
- Collaborative Workspace: Enable group work features that make teamwork a breeze, fostering innovation and efficiency.
- Full Control: Rumi provides a robust platform for managing your models, from deployment to maintenance, giving you the reins to drive your business forward. 

## Prerequisites:
1. Ensure Docker is installed on your server.
2. Install Docker Compose V2:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   ```
   ```bash
   sudo chmod +x /usr/local/bin/docker-compose
   ```
### Verify installation:
   ```bash
   docker compose version
   ```

## Setup Instructions:

1. Clone the repository:
```bash
   git clone https://github.com/kaizen-kaku/rumi.git
   cd ./rumi
```

2. Make the setup script executable:
```bash
   chmod +x setup.sh
```

3. Create and edit the .env file in the frontend directory:
```bash
cd frontend
```
```bash
nano .env
```

## Environment Variables 
   ```bash 
   # AUTH & DB
   AUTH_SECRET="your_auth_secret" # openssl rand -base64 32
   DATABASE_URL="postgres://myuser:mypassword@localhost:5432/myapp"
   POSTGRES_PRISMA_URL="postgres://myuser:mypassword@localhost:5432/myapp?sslmode=require&pgbouncer=true&connect_timeout=15"
   DATABASE_URL_NON_POOLING="postgres://myuser:mypassword@localhost:5432/myapp?sslmode=require"

   # PostgreSQL connection details
   POSTGRES_USER="myuser"
   POSTGRES_HOST="localhost"
   POSTGRES_PASSWORD="mypassword"
   POSTGRES_DATABASE="myapp"
   POSTGRES_PORT="5432"

   AUTH_TRUST_HOST="http://{YOUR_SERVER_IP}:3000"
   OLLAMA_API_URL="http://localhost:11434"
   NODE_ENV=""
   ```

   Save and exit the editor (in nano, press Ctrl+X, then Y, then Enter)

4. Return to the main directory:
   cd ..

5. Run the setup script:
   ./setup.sh

   This script will build and start the necessary Docker containers.

6. Once the setup is complete, you can access the application at:
   http://[your-server-ip]:3000

Troubleshooting:
- If you encounter any issues, check the Docker logs:
  docker compose logs

- Ensure all environment variables are correctly set in the .env file.
- Verify that all required ports are open and not blocked by a firewall.

For more detailed information or if you encounter any issues, please refer to the project documentation or contact the development team.