# étape de build
# FROM node:lts-alpine as build-stage
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build
EXPOSE 4001
CMD ["node", "index.js"]

# étape de production
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]