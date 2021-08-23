FROM node:14

RUN npm install yarn -g

WORKDIR /app

COPY . /app

RUN yarn install --production=true

EXPOSE 4000

CMD ["yarn", "build"]

CMD ["yarn", 'start:prod']
