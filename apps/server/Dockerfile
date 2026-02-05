# --- STAGE 1: Build Stage ---
FROM node:22 AS builder
WORKDIR /usr/src/app

# Copy root package files
COPY package.json package-lock.json ./

# Copy the server-specific package.json
COPY apps/server/package.json ./apps/server/

# Install ALL dependencies (needed for the TypeScript compiler)
RUN npm install

# Copy the rest of the monolith source code
COPY . .

# Build the server (compiles TS to JS in apps/server/dist)
# The skipLibCheck in tsconfig will prevent the Dashboard errors
# This tells tsc to ONLY build the current project and IGNORE the references (the dashboard)
RUN ./node_modules/.bin/tsc -p apps/server/tsconfig.json --build --clean && \
    ./node_modules/.bin/tsc -p apps/server/tsconfig.json --declaration false

# --- STAGE 2: Runtime Stage ---
FROM node:22-slim
WORKDIR /usr/src/app

# Set production environment
ENV NODE_ENV=production

# Copy only the necessary files from the builder
COPY package.json package-lock.json ./
# Copy the installed node_modules
COPY --from=builder /usr/src/app/node_modules ./node_modules
# Copy the compiled code and its package.json
COPY --from=builder /usr/src/app/apps/server/dist ./apps/server/dist
COPY --from=builder /usr/src/app/apps/server/package.json ./apps/server/package.json

# Expose Vendure port
EXPOSE 3000

# Start the compiled server
CMD ["npm", "run", "start:server", "--workspace=server"]
