# 🏋️ CalisthenicsHub

> A production-grade SaaS fitness platform for professional calisthenics instructors.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | NestJS, TypeScript, PostgreSQL, Prisma ORM |
| Frontend | Next.js, TypeScript, TailwindCSS, ShadCN/UI |
| Auth | JWT, bcrypt, Role-Based Access Control |
| Payments | Stripe |
| DevOps | Docker, GitHub Actions, Railway/Vercel |

## Getting Started (Local Development)

### Prerequisites
- Node.js v20+
- Docker Desktop
- Git

### 1. Clone the repository
```bash
git clone <repo-url>
cd calisthenics-hub
```

### 2. Start the database
```bash
docker compose up -d
```

### 3. Set up the backend
```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run start:dev
```

### 4. Set up the frontend
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

## Project Structure

```
calisthenics-hub/
├── backend/          # NestJS REST API
├── frontend/         # Next.js App
├── docker-compose.yml
└── README.md
```

## Documentation

- [API Documentation](http://localhost:3001/api/docs) — Swagger UI (when backend is running)
- [Database Schema](./backend/prisma/schema.prisma)

---

Built with ❤️ as a portfolio-grade full-stack project.
