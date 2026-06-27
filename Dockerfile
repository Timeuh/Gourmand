# -------------------
# Step 1 : Base
# -------------------
FROM node:22-slim AS base
WORKDIR /app

# Install system dependencies (needed for Prisma)
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Install JS dependencies
COPY package.json package-lock.json* ./
RUN npm ci --include=dev

# -------------------
# Step 2 : Builder
# -------------------
FROM base AS builder
WORKDIR /app

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Nuxt
RUN npm run build

# -------------------
# Step 3 : Runner
# -------------------
FROM node:22-slim AS runner
WORKDIR /app

# Install runtime dependencies only
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
ENV PORT=3000

# create non-root user
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nuxt

USER nuxt

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]

# -------------------
# Step 4 : dev
# -------------------
FROM node:22-slim AS dev
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=development
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
ENV HOST=0.0.0.0

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]