FROM node:11.11.0

MAINTAINER jngcii <concotree@gmail.com>

RUN mkdir /app
WORKDIR /app
ENV APP_PATH /app

COPY . /app

RUN npm install
RUN npm install pm2 -g

EXPOSE 3000