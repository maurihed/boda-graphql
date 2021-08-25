FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g ts-node

RUN npm ci --only=production

COPY . .

EXPOSE 4000

CMD ["npm", "run", "build"]

CMD ["npm", "run", "start:prod"]
