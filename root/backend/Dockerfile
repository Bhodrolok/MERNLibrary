#https://docs.docker.com/build/building/packaging/
#https://docs.docker.com/language/nodejs/build-images/
FROM node:18-alpine
ARG NODE_ENV=production
ARG PORT=4000
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app/backend
#take advantage of cached Docker layers by only copying local package.json to image cwd (dependencies!) 
COPY package*.json /app/backend
#install dependencies sans dev ones cuz not needed for end user!
RUN npm install --production
#add source code into container image
COPY . /app/backend
#ENV PORT=4000
#Want port to be available for traffic(outside)
EXPOSE ${PORT}
CMD ["npm","run", "startBack"]