FROM node:10
WORKDIR /opt/frontend
ENV PATH /opt/frontend/node_modules/.bin:$PATH
COPY package*.json /opt/frontend
RUN yarn install --silent
COPY . .
CMD [ "yarn", "start" ]
