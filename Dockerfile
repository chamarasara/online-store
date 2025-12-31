# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app
RUN apk add --no-cache python3 g++ make

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Stage 2: Runtime
FROM node:20-alpine AS runner

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy built app + migrations/seeders/config
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/seeders ./seeders
COPY --from=builder /app/sequelize.config.cjs ./

# Copy entrypoint and make it executable
COPY docker/entrypoint.sh ./docker/entrypoint.sh
RUN chmod +x ./docker/entrypoint.sh

ENV NODE_ENV=production
EXPOSE 3000

ENTRYPOINT ["./docker/entrypoint.sh"]
