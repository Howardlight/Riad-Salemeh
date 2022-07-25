
FROM node:16-alpine3.15

USER node

RUN mkdir /home/node/code

RUN mkdir /home/node/code/src

WORKDIR /home/node/code

COPY --chown=node:node package.json package-lock.json Procfile tsconfig.json ./

COPY --chown=node:node src ./src

RUN npm ci

CMD ["npm", "run", "start"]