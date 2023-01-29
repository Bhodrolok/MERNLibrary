FROM node:18-alpine

WORKDIR /app/front

COPY package*.json .

RUN npm install

COPY . /app/front/

EXPOSE 3000

# RUN npm install serve
# RUN npm run build

CMD ["npx","npm", "start"]
