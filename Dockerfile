FROM node:10 
ENV PORT 4300
ENV DB_HOST mongo
ENV DB_PORT 27017
ENV DB_NAME 3DD
ENV API_DOC_DIR ./apidoc
ENV NODE_ENV production
EXPOSE ${PORT}
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ./node_modules/.bin/apidoc -i ./routes -o ${API_DOC_DIR}
ENTRYPOINT ["./node_modules/.bin/pm2", "start", "deploy.json"]

