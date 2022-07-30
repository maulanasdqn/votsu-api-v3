FROM node:gallium-alpine AS builder

# Create app directory
WORKDIR /app
ARG DATABASE_URL
ENV PORT=5000

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY .env ./

# Install app dependencies
RUN yarn

COPY . .

RUN yarn build

FROM python:bullseye
FROM node:gallium-alpine AS prod

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

RUN npx prisma generate

ENV PORT=5000
EXPOSE ${PORT}
CMD [ "yarn", "start:prod" ]
