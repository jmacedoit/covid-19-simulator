FROM node:12.16-alpine as build

# Setup working directory
WORKDIR /usr/src/app

# Install
COPY package*.json ./
RUN npm install

# Copy remaining files
COPY . ./

# Bundle
RUN npm run build

# Serve with nginx
FROM nginx:1.16.0-alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
