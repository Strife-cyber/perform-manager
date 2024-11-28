# Use a Node.js base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the app's port (e.g., 3000)
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]
