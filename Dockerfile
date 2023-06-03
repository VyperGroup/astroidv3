FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i -g npm
RUN npm install
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD [ "node", "index.js" ]
