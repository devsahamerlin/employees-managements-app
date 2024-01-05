FROM node:20-alpine as angular
WORKDIR /ng-app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build:production

FROM nginx:alpine
COPY --from=angular /ng-app/dist/employees-management-web-app/browser /usr/share/nginx/html
EXPOSE 80