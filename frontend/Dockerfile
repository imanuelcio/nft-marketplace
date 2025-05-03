# Build tahap
FROM node:18 AS builder

WORKDIR /app
COPY . .

# Install dependencies dan build frontend
RUN npm install
RUN npm run build

# Tahap production server
FROM node:18 AS runner
WORKDIR /app

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

# Expose port 3000 untuk frontend
EXPOSE 3000
CMD ["npm", "run", "start"]
