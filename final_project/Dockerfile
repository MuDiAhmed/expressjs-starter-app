FROM node:10 
ENV PORT 4300
ENV DB_HOST mongo
ENV DB_PORT 27017
ENV DB_NAME 3DD
ENV FOREVER_ROOT ./log/forever
EXPOSE ${PORT}
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p ./log
ENTRYPOINT ["./node_modules/.bin/forever", "start", "forever.json"]

