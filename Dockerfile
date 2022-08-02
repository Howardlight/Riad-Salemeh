
FROM node:16-alpine3.15

RUN apk add --no-cache curl \
    && curl -sL https://unpkg.com/@pnpm/self-installer | node

USER node

RUN mkdir /home/node/code

RUN mkdir /home/node/code/src

WORKDIR /home/node/code

COPY --chown=node:node package.json pnpm-lock.yaml Procfile tsconfig.json ./

COPY --chown=node:node src ./src

RUN pnpm install

CMD ["pnpm", "run", "start"]