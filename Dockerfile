FROM node:12

MAINTAINER jngcii <concotree@gmail.com>

RUN mkdir /app
WORKDIR /app
ENV APP_PATH /app

COPY . /app

RUN npm install -g pm2
RUN npm install yarn
RUN yarn install
RUN yarn global add prisma
RUN prisma deploy
RUN prisma generate

EXPOSE 3000

CMD pm2 start econsystem.config.js --interpreter ./node_modules/.bin/babel-node