FROM node:14-alpine

LABEL maintainer="aurel.civi.hann@gmail.com"

WORKDIR nullchat

COPY ./.bin /nullchat

EXPOSE 5000

ENTRYPOINT ["node", "null.js"]
