# Use node:18 as base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Use serve for static file hosting
RUN npm install -g serve

# Set the default command to run the application
# This will be executed when running the container using `docker run`, docker-compose, etc.
CMD ["serve", "-s", "build", "-l", "3000"]
