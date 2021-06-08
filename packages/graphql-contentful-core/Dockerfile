# Use minimum linux image as base
FROM alpine
# Install build tools
RUN apk add --update nodejs nodejs-npm git
# Set default directory for image commands
WORKDIR /app
# Copy over only the source code and configurations
# files needed to run and test
COPY package.json ./package.json

# Install project dependencies
RUN npm install

COPY src/ ./src
COPY jest.config.js ./jest.config.js
COPY nodemon.json ./nodemon.json

# Create a git repository so we can run jest with --watch flag
# https://github.com/wmonk/create-react-app-typescript/issues/282
RUN git init
CMD npm run start:dev
