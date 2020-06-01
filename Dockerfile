FROM node:14.0.0

WORKDIR /usr/app

COPY client/package.json ./

RUN npm install
RUN npm run configure

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
