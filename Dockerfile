FROM node:22-alpine

WORKDIR /pizza-cubed

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD npm start