FROM node:22 AS build-stage 

WORKDIR /usr/src/app

COPY . .

ARG VITE_BACKEND_URL

RUN npm ci

RUN npm run test

RUN npm run build

FROM nginx:1.20.1

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html