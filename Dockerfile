# make production build for react client
#
FROM node:10-alpine as build-client
COPY /client /temp
COPY tslint.common.json /
WORKDIR /temp
RUN npm install --production
RUN npm run build

# run node.js server, and add build from previous stage to its static resources
#
FROM node:10-alpine as run-server
COPY /server /app
COPY tslint.common.json /
COPY --from=build-client /temp/dist /app/static
WORKDIR /app
RUN npm install --production
RUN npm run build
EXPOSE 1337
CMD [ "node", "dist/index.js" ]
