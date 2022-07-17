FROM node:16.16.0 as build

WORKDIR /code

COPY package.json /code/package.json
COPY yarn.lock /code/yarn.lock

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:1.12-alpine as prod

COPY --from=build /code/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]