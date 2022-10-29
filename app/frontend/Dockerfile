FROM node:16.14-alpine

WORKDIR /app-frontend

# COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
