FROM node:12-buster-slim

EXPOSE 3000

WORKDIR /app

COPY package.json yarn.lock ./
RUN set -eux; \
    yarn install --frozen-lockfile

COPY . ./

CMD ["yarn", "next"]
