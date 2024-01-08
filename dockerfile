FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for backend
COPY app/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend application code
COPY app .

# Move to the frontend directory
WORKDIR /FRONTEND/client

# Copy package.json and package-lock.json for frontend
COPY FRONTEND/client/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend application code
COPY FRONTEND/client .

# Expose the ports your apps will run on
EXPOSE 3000

# Copy the startup script
COPY start.sh /app/start.sh

# Give execute permissions to the script
RUN chmod +x /app/start.sh

# Command to run the startup script
CMD ["/bin/sh", "/app/start.sh"]
