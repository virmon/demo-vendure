FROM node:20

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

COPY apps/server ./apps/server

RUN npm install --production
COPY . .
RUN npm run build
