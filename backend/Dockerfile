# Gunakan image Node.js
FROM node:18

# Set work directory
WORKDIR /

# Copy semua file yang diperlukan
COPY . .

# Install dependencies
RUN npm install


# Jalankan server
CMD ["npm", "run", "dev"]
