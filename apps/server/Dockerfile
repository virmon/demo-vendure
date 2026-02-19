# --- STAGE 1: Build Stage ---
FROM node:22 AS builder
WORKDIR /usr/src/app

# Copy root and server manifests
# COPY package.json package-lock.json ./
# COPY apps/server/package.json ./apps/server/
COPY . .

# Install ALL dependencies (needed for tsc)
RUN npm install

# Copy the entire monolith source
# COPY . .

RUN npm run

# Build the server
# RUN ./node_modules/.bin/tsc -p apps/server/tsconfig.json \
#     --skipLibCheck true \
#     --emitDeclarationOnly false \
#     --noEmit false \
#     --declaration false || [ -d "apps/server/dist" ]
RUN npm --prefix apps/server run build:dashboard

# --- STAGE 2: Runtime Stage ---
FROM node:22-slim
WORKDIR /usr/src/app

# 1. Copy manifests and install production dependencies
# COPY package.json package-lock.json ./
# COPY apps/server/package.json ./apps/server/
# COPY . .
# RUN npm ci --only=production

# 2. THE CRITICAL FIX: Copy the static assets (Email templates, etc.)
# Your error proved Vendure needs these files at runtime to bootstrap
# COPY --from=builder /usr/src/app/apps/server/static ./apps/server/static

# 3. Copy the compiled JS from builder into the correct subfolder
# Maintaining the 'apps/server/dist' path ensures relative imports work
# COPY --from=builder /usr/src/app/apps/server/dist ./apps/server/dist

# 4. Set environment variables
ENV NODE_ENV=production
# Cloud Run expects 8080
ENV PORT=8080
EXPOSE 8080

# 5. Start the application
# Points directly to the compiled entry point
CMD ["node", "apps/server/dist/index.js"]
