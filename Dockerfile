# Step 1: Build the app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the Vite app
#RUN npm run build

# Step 2: Serve with Nginx
#FROM nginx:alpine

# Copy build files to Nginx html folder
#COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
#EXPOSE 80
EXPOSE 5173
# Start Nginx
#CMD ["npm", "run", "dev", "--host"]
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
