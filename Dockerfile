FROM node:8.9.0-alpine

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install --production

CMD npm start
