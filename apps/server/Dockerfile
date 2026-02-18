# --- STAGE 1: Build ---
FROM node:22 AS builder
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY apps/server/package.json ./apps/server/

RUN npm install
COPY . .
RUN ./node_modules/.bin/tsc -p apps/server/tsconfig.json --skipLibCheck true

# --- STAGE 2: Runtime ---
FROM node:22-slim
WORKDIR /usr/src/app

# Preserve the monolith structure so 'apps/server/dist/index.js' can find '../../node_modules'
COPY package.json package-lock.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/apps/server/dist ./apps/server/dist
COPY --from=builder /usr/src/app/apps/server/package.json ./apps/server/package.json

# Ensure we use 8080
ENV PORT=8080
EXPOSE 8080

# Run the compiled JS directly
CMD ["node", "apps/server/dist/index.js"]
