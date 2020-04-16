FROM node:12.16.2
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon

EXPOSE 3001
CMD ["nodemon", "index.js"]