# FROM node:latest
# ARG SERVER_URL

# # Set the working directory in the container
# WORKDIR /usr/src/app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY ui/package*.json ./

# RUN npm install

# # Bundle app source
# COPY ui/ .

# ENV NEXT_PUBLIC_SERVER_URL=$SERVER_URL
# # Build your Next.js app for production
# RUN npm run build

# # Start the application
# CMD ["npm", "start"]

FROM node:20-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY ui/package*.json ./
RUN npm cache clean --force && npm ci --legacy-peer-deps

# Bundle app source
COPY ui/ .

ARG SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=$SERVER_URL

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
