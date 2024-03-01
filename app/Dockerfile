# Use a Node.js base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application
COPY . .

# Remove the previous build
RUN rm -rf ./dist

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 8080

# Start your application
CMD [ "node", "dist/index.js" ]
