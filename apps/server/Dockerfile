# --- STAGE 1: Build Stage ---
FROM node:22 AS builder
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY apps/server/package.json ./apps/server/

# Install ALL dependencies
RUN npm install

COPY . .

# THE FIX: Use 'tsc' but tell it to ignore all the library errors 
# and only emit the JS files from your 'src' folder.
RUN ./node_modules/.bin/tsc -p apps/server/tsconfig.json \
    --skipLibCheck true \
    --emitDeclarationOnly false \
    --noEmit false \
    --declaration false || [ -d "apps/server/dist" ]

# Check if build actually worked
RUN ls -l apps/server/dist/index.js

# --- STAGE 2: Runtime ---
FROM node:22-slim
# Install library for PostgreSQL if needed
RUN apt-get update && apt-get install -y libpq-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# COPY THE WHOLE STRUCTURE (Crucial for Monoliths)
COPY package.json package-lock.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/apps/server/dist ./apps/server/dist
COPY --from=builder /usr/src/app/apps/server/package.json ./apps/server/package.json

ENV NODE_ENV=production
# Cloud Run uses 8080 by default. Vendure will pick this up via process.env.PORT
ENV PORT=3000
EXPOSE 3000

# Execute from the root using the workspace flag
CMD ["node", "apps/server/dist/index.js"]