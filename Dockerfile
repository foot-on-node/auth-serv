FROM node:10.15.0

WORKDIR /auth-server

COPY . .

RUN npm install

EXPOSE 8080

CMD ["node", "server.js"]
