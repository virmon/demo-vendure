# --- STAGE 1: Build ---
FROM node:22 AS builder
WORKDIR /usr/src/app

# Copy root manifests
COPY package.json package-lock.json ./
# Copy workspace manifests (crucial for npm to map paths correctly)
COPY apps/server/package.json ./apps/server/

# Install ALL dependencies (including TypeScript)
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the server workspace
# This will now find 'tsc' in the node_modules
RUN npm run build --workspace=server

# --- STAGE 2: Runtime ---
FROM node:22-slim
WORKDIR /usr/src/app

# Only copy the production-ready files
COPY package.json package-lock.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/apps/server/dist ./apps/server/dist
COPY --from=builder /usr/src/app/apps/server/package.json ./apps/server/package.json

EXPOSE 3000
# Run the compiled JS from the dist folder
CMD ["npm", "run", "start", "--workspace=server"]
