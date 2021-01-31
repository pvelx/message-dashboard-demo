FROM node:14.13-alpine
WORKDIR '/app'
COPY ./package.json ./
RUN npm install

RUN npm install -g @quasar/cli && \
    npm install -g @vue/cli && \
    npm install -g @vue/cli-init


COPY . .
CMD ["quasar", "dev"]
