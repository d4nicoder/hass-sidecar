FROM node:14.10-alpine

RUN apk add --no-cache ffmpeg
RUN mkdir /opt/app
COPY . /opt/app
WORKDIR /opt/app
RUN npm ci

VOLUME ["/opt/app/src/automations"]
ENTRYPOINT ["npm", "start"]