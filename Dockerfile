FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3003

CMD ["sh", "-c", "npx prisma db push && npm run dev"]