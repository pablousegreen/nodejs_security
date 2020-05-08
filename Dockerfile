FROM node:lastest

COPY . /src 

WORKDIR /src

RUN npm install --production

EXPOSE 3001

CMD npm start