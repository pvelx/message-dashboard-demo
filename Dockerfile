FROM node:14.13-alpine as ui-builder
RUN mkdir /app
WORKDIR /app

COPY ./package*.json ./

RUN npm install

RUN npm install -g @quasar/cli && \
    npm install -g @vue/cli && \
    npm install -g @vue/cli-init

COPY . .

RUN quasar build

FROM nginx:1.17.0-alpine
RUN rm /usr/share/nginx/html/*
COPY  --from=ui-builder /app/dist/spa /usr/share/nginx/html

EXPOSE 80

CMD sed -i -e "s#{{ API_URL }}#$API_URL#g" /usr/share/nginx/html/js/app.*.js && nginx -g "daemon off;"
