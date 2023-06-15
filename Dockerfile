FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i -g npm
RUN npm install
COPY . .
ENV PORT=3300
EXPOSE 3300
CMD [ "node", "index.js" ]
