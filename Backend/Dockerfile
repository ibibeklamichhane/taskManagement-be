# Use Node.js base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Expose the port your backend server listens on
EXPOSE 5000

# Build the TypeScript code (optional, for production)
# RUN npm run build

# Start the application in development mode
CMD ["npm", "run", "dev"]
