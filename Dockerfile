FROM node:10

WORKDIR /home/alex/blockchain-api-health-monitor/blockchain-api-health-monitor

COPY package.json ./

RUN npm rebuild scrypt --update-binary
RUN npm install

COPY . .

# EXPOSE 8631

CMD ["npm", "start"]
