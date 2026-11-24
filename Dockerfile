# Stage 1: Build the Next.js application
FROM node:24-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --no-fund --no-audit

# Copy the rest of the application source code
COPY . .

# Build the Next.js application for static export
RUN npm run build:prod

# Stage 2: Serve the static files with Nginx
FROM nginx:1.29-alpine

# Copy the static files from the builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
