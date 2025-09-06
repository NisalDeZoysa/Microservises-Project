FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV KAFKA_BROKERS=localhost:9094
ENV GMAIL_USER=nisalzoysa2001@gmail.com
ENV GMAIL_PASS="dvwe axbp djfi lvxn"

CMD ["npm", "run", "start"]