FROM alpine:3.16

LABEL maintainer="Sojeong Han <42.4.sohan@gmail.com>" \
    nginx-version="1.22.1" \
    alpine-version="3.16.0"

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
 
RUN apk update && \
    apk add bash nodejs-lts npm && \
    npm install --no-cache
 
# 서버 소스 복사
COPY . /app

EXPOSE 8080

ENTRYPOINT ["npm", "run", "start"]