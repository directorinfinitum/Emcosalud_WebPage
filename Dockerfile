# ── build ──────────────────────────────────────────────
FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --include=dev --include=optional
COPY . .
RUN NODE_ENV=production npm run build

# ── runtime ────────────────────────────────────────────
FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

COPY package*.json ./
COPY --from=build /app/node_modules ./node_modules
RUN npm prune --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist

EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
