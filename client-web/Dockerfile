FROM node:12-buster-slim as frontend

EXPOSE 3000

WORKDIR /app

COPY package.json yarn.lock ./
RUN set -eux; \
    yarn install --frozen-lockfile;

COPY . ./

RUN set -eux; \
    yarn run generate-keys; \ 
    yarn build 

VOLUME [ "/app/config/jwk" ]

CMD ["yarn", "start"]
