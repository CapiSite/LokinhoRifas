FROM node:20.11

WORKDIR /src/usr/LokinhoRifas

COPY . .

EXPOSE 5000

RUN npm i
RUN npm run build
RUN npm run dev:migration:run

CMD ["npm", "start"]