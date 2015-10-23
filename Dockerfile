FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install

ENTRYPOINT /src
