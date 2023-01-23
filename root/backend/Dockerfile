#https://docs.docker.com/build/building/packaging/
#https://docs.docker.com/language/nodejs/build-images/
FROM node
ENV NODE_ENV=production
WORKDIR /app
#take advantage of cached Docker layers by only copying package.json
COPY package.json .
RUN npm install --production
#add source code into container image
COPY . .
ENV PORT=4000
EXPOSE 4000
CMD ["npx","nodemon"]