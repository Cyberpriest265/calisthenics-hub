# ⚡ CalisthenicsHub

> A professional full-stack SaaS platform for bodyweight training courses — built with NestJS, Next.js, and PostgreSQL.

---

## 🗂️ Project Structure

```
calisthenics-hub/
├── backend/          # NestJS REST API (Port 3001)
├── frontend/         # Next.js Web App (Port 3000)
├── docs/             # Project documentation
└── README.md
```

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 15, TypeScript, Vanilla CSS |
| **Backend** | NestJS, TypeScript |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | JWT + Passport.js |
| **Payments** | Paystack |
| **Deployment** | Vercel (frontend) + Railway (backend) |

---

## ✅ Features Built

- 🔐 **Authentication** — Register, Login, JWT-based sessions
- 🛡️ **Role-Based Access Control** — ADMIN vs STUDENT roles
- 📚 **Course Management** — Full CRUD with publish/unpublish
- 🎬 **Lesson Management** — Nested lessons inside courses
- 🏠 **Public Landing Page** — Course catalog for visitors
- 📋 **Student Dashboard** — Personalized view after login
- 👑 **Admin Panel** — Browser UI to manage all content
- 💳 **Payments** — Paystack integration *(in progress)*

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js v18+
- PostgreSQL (running locally)
- Git

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/calisthenics-hub.git
cd calisthenics-hub
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
PORT=3001
NODE_ENV=development
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/calisthenics_hub?schema=public"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN=7d
PAYSTACK_SECRET_KEY="sk_test_..."
PAYSTACK_PUBLIC_KEY="pk_test_..."
```

Run database migrations:
```bash
npx prisma migrate dev
```

Start the backend:
```bash
npm run start:dev
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the `frontend/` folder:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_..."
```

Start the frontend:
```bash
npm run dev
```

### 4. Open in browser
| URL | Page |
|---|---|
| `http://localhost:3000` | Landing Page |
| `http://localhost:3000/register` | Register |
| `http://localhost:3000/login` | Login |
| `http://localhost:3000/dashboard` | Student Dashboard |
| `http://localhost:3000/admin` | Admin Panel |

---

## 🔒 Security Notes

- `.env` and `.env.local` are **never committed** to Git (see `.gitignore`)
- All admin endpoints are protected by JWT + Role guards
- Passwords are hashed with `bcrypt`

---

## 📄 Documentation

See the [`/docs`](./docs/) folder for:
- [Functional Requirements Document (FRD)](./docs/FRD.md)

---

## 📬 API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Create account |
| POST | `/auth/login` | Public | Get JWT token |
| GET | `/auth/profile` | JWT | View own profile |
| GET | `/courses` | Public | List published courses |
| GET | `/courses/:id` | Public | Get course + lessons |
| POST | `/courses` | Admin | Create course |
| PATCH | `/courses/:id` | Admin | Update course |
| DELETE | `/courses/:id` | Admin | Delete course |
| PATCH | `/courses/:id/publish` | Admin | Publish course |
| PATCH | `/courses/:id/unpublish` | Admin | Unpublish course |
| GET | `/courses/admin` | Admin | All courses incl. drafts |
| POST | `/courses/:id/lessons` | Admin | Add lesson |
| DELETE | `/courses/:id/lessons/:id` | Admin | Delete lesson |
| POST | `/payments/initialize` | JWT | Start payment flow |
| POST | `/payments/verify` | JWT | Verify and unlock course |
