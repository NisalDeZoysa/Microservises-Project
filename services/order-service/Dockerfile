FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV KAFKA_BROKERS=kafka:9092
ENV MONGO_URI=mongodb+srv://nisalmicro:micro1234@microcluster.w872zhn.mongodb.net/?retryWrites=true&w=majority&appName=microcluster

CMD ["npm", "run", "start"]