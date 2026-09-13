FROM node:26-slim
WORKDIR /app

COPY . .
CMD ["npm", "run", "setup"]
