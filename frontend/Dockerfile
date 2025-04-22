FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Use serve for static file hosting
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
