# --- Build frontend ---
FROM node:16 as frontend-builder
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

COPY frontend .
RUN npm run build

# --- Build backend ---
FROM node:16 as backend-builder
WORKDIR /app/backend

COPY backend/package.json backend/package-lock.json ./
RUN npm install
#RUN npm run build

COPY backend .

# --- Final container image ---
FROM node:16
WORKDIR /app
ENV NODE_ENV=production

COPY --from=backend-builder /app/backend /app/backend
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Expose the API port
EXPOSE 3000

# Set the working directory for the backend
WORKDIR /app/backend

# Start the backend server
CMD ["npm", "start"]
