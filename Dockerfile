FROM node:20-alpine AS base

FROM base AS builder

RUN apk add --no-cache gcompat
RUN apk add iputils
WORKDIR /app

COPY package*json tsconfig.json src ./

RUN yarn
RUN rm -rf dist
RUN yarn build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json

USER root
EXPOSE 9110

CMD ["node", "/app/dist/index.js"]
