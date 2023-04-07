# --- Build frontend ---
FROM node:16-alpine as frontend-builder
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend .
RUN npm run build

# --- Build backend ---
FROM node:16-alpine as backend-builder
WORKDIR /app/backend

COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend .
RUN npm run build

# --- Final container image ---
FROM node:16-alpine
WORKDIR /app

COPY --from=backend-builder /app/backend /app/backend
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Expose the API port
EXPOSE 3000

# Set the working directory for the backend
WORKDIR /app/backend

# Start the backend server
CMD ["npm", "start"]
