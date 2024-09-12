FROM node:20.11

WORKDIR /src/usr/LokinhoRifas

COPY . .

EXPOSE 5000

RUN npm i
RUN npm run build

CMD ["npm", "start"]
