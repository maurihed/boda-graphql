FROM node:14

VOLUME [/usr/src/app]

WORKDIR /usr/src/app

EXPOSE 4000

RUN npm run install

CMD ["npm", "run", "build"]

CMD ["npm", "run", "start:prod"]
