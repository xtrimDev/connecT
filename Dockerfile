FROM node:26-slim
WORKDIR /app

COPY . .

CMD ["sh", "-c", "cd backend && npm run setup & cd frontend && npm run dev & wait"]