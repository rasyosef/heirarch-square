# Pull base image
FROM node:22.21.1-bullseye-slim

# Set work directory
WORKDIR /code

# Install dependencies
COPY ./package.json .
RUN npm install -g pnpm
RUN pnpm install

# Copy project
COPY . .

# Set environment variables
ARG DATABASE_URL
ARG AUTH_SECRET
ARG AUTH_TRUST_HOST true
ARG NEXTAUTH_URL http://localhost:3000
ARG BLOB_READ_WRITE_TOKEN

ENV DATABASE_URL=$DATABASE_URL
ENV AUTH_SECRET=$AUTH_SECRET
ENV AUTH_TRUST_HOST=$AUTH_TRUST_HOST
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV BLOB_READ_WRITE_TOKEN=$BLOB_READ_WRITE_TOKEN

# Build
# RUN pnpm run build

