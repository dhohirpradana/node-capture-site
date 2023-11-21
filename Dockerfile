# Use a Node.js base image
FROM node:lts

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Install necessary tools like chromium
RUN apt-get update && apt-get install -y chromium

# Expose port 3000 (assuming your Node.js app listens on port 3000)
EXPOSE 3000

# Command to start the Node.js application
CMD ["node", "index.js"]