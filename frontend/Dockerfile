FROM node:10
WORKDIR /opt/frontend
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start" ]
