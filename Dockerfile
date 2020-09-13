FROM node:14.10-alpine

RUN apk update && apk add ffmpeg
RUN mkdir /opt/app
COPY . /opt/app
WORKDIR /opt/app
RUN npm ci

VOLUME ["/opt/app/src/automations"]
ENTRYPOINT ["npm", "start"]