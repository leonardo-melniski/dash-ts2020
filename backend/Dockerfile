FROM node:10
WORKDIR /opt/backend/
COPY package*.json ./
RUN npm install
RUN npm ci --only=production
COPY . .
EXPOSE 8080
EXPOSE 20
CMD [ "node", "server.js" ]
