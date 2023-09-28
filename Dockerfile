FROM node:20-alpine

WORKDIR /home/container

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

CMD ["pm2-runtime", "app.js"]