FROM node:8
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
CMD node server.js
EXPOSE 3001


