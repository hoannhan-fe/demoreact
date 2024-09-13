# Use an official Node.js image as the base image for the container
FROM node:18.19.0-alpine 

WORKDIR /app

ENV NEXT_PUBLIC_BASE_URL='https://helenspeaking.com/api'
ENV PROXY_BACKEND='https://backend.helenspeaking.com/api/v1'

COPY . .
RUN yarn install

# Build the application
RUN yarn build

EXPOSE 3000

# Start the application
CMD [ "yarn", "start" ]