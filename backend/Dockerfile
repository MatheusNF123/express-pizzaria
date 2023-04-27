FROM node:16.14

WORKDIR /app

COPY package*.json ./

RUN ["npm", "i"] 

COPY . .

RUN chown node:node /app

USER node

CMD ["npm", "run", "dev"]
