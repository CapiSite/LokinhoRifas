FROM node:16.15

WORKDIR /src/usr/lokinhoskins

COPY . .

EXPOSE 3000

RUN npm i
RUN npm run build

CMD ["npm", "start"]