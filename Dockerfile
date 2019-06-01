FROM node:10.15.0

WORKDIR /usr/src/app/web-site

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
