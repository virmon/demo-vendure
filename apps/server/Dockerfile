FROM node:20

WORKDIR /usr/src/app

# 1. COPY from root context into the container
# We copy root files first to leverage Docker layer caching
COPY package.json package-lock.json ./

# 2. COPY the server folder specifically
# Source: apps/server | Destination: apps/server
COPY apps/server ./apps/server

# 3. Install dependencies 
# (If using workspaces, this installs everything in the monolith)
RUN npm install

# 4. Build the server
RUN npm run build --workspace=apps/server

EXPOSE 3000

# 5. Start command using workspace flag
CMD ["npm", "run", "start", "--workspace=apps/server"]
