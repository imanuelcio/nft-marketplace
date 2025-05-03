# Build tahap
FROM node:18-alpine

RUN mkdir -p /src/app
WORKDIR /src/app


# Install dependencies dan build frontend
COPY package*.json ./ /src/app/

RUN npm install

COPY . /src/app/

RUN npm run build

# Expose port 3000 untuk frontend
EXPOSE 3000
CMD ["npm", "run", "start"]
