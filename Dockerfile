FROM node:gallium-alpine AS builder

WORKDIR /app
ENV PORT=5000

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/
COPY tsconfig.json ./

RUN yarn

COPY . .

RUN yarn build

FROM node:gallium-alpine AS prod

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

ENV PORT=5000
EXPOSE ${PORT}
CMD [ "yarn", "start:prod" ]
