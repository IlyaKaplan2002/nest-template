# Dockerfile

# Use an existing node alpine image as a base image.
FROM node:alpine

# Set the working directory.
WORKDIR /app

# Copy the package.json file.
COPY package.json .

# Install application dependencies.
RUN npm install

# Copy the rest of the application files.
COPY . .

# Expose the port.
EXPOSE 3000

RUN npm run build

# Run the application.
CMD ["npm", "run", "start:prod"]