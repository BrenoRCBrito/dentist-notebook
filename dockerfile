FROM node:latest
RUN mkdir /app
WORKDIR /app
RUN mkdir /app/prisma
RUN mkdir /app/dist
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
COPY ./prisma/schema.prisma .
COPY ./tsconfig.build.json .
COPY ./dist/src ./dist
COPY ./dist/tsconfig.build.tsbuildinfo ./dist
COPY ./package.json .
RUN npm install
CMD /wait && npx prisma db push && npm run start