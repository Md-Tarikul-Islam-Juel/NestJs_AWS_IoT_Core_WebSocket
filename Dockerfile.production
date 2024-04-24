FROM node:18.17.1

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm install

COPY . /usr/src/app

RUN npx prisma generate

RUN npm run build

CMD ["npm", "start", "start:prod"]
