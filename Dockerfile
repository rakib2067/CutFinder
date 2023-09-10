FROM node:18.0.0
WORKDIR /src
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]


