# Functional Requirements Document (FRD) - CalisthenicsHub

> **Last Updated:** May 2026  
> **Status:** 🟡 In Progress

---

## Implementation Status

| Feature | Status |
|---|---|
| User Registration & Login | ✅ Complete |
| JWT Authentication | ✅ Complete |
| Role-Based Access Control (ADMIN / STUDENT) | ✅ Complete |
| Course CRUD (Admin) | ✅ Complete |
| Lesson CRUD (Admin) | ✅ Complete |
| Publish / Unpublish Courses | ✅ Complete |
| Public Course Catalog | ✅ Complete |
| Course Detail Page | ✅ Complete |
| Student Dashboard | ✅ Complete |
| Admin Panel (Browser UI) | ✅ Complete |
| Paystack Payment Integration | 🔄 In Progress |
| Email Verification | 🔲 Planned |
| Video Player | 🔲 Planned |
| Progress Tracking | 🔲 Planned |
| Sales Analytics | 🔲 Planned |

---

## 1. User Authentication & Authorization

- ✅ Users can register with name, email, and password.
- ✅ Users can log in to receive a JWT (JSON Web Token).
- ✅ Two Roles: `STUDENT` (default) and `ADMIN` (instructor).
- ✅ Protected routes enforced via JWT guards on the backend.
- ✅ Role-based UI — Admin sees admin panel link; Students see dashboard only.
- 🔲 Email verification before accessing paid content.

## 2. Public Marketing Website

- ✅ **Hero Section**: High-impact visual + "Start Training" button.
- ✅ **Course Catalog**: Cards showing all published courses with price.
- ✅ **Course Detail Page**: Description, lesson list, and enroll button.
- 🔲 **Instructor Bio**: Experience, certifications, and branding.
- 🔲 **Testimonials**: Social proof from previous students.
- 🔲 **Contact Form**: Direct lead generation.

## 3. Student Dashboard

- ✅ **Browse Courses**: View all published courses.
- ✅ **User Profile**: Display name, email, and role badge.
- 🔲 **My Courses**: List of all purchased programs.
- 🔲 **Video Player**: High-quality video streaming for lessons.
- 🔲 **Progress Tracking**: See % completion of each course.
- 🔲 **Profile Management**: Update name, avatar, and password.

## 4. Admin Dashboard (Instructor Only)

- ✅ **Course Manager**: Create, edit, delete, publish/unpublish courses via browser UI.
- ✅ **Lesson Manager**: Add and delete lessons per course.
- ✅ **Stats Overview**: Total courses, published count, draft count, total lessons.
- 🔲 **Video Uploader**: Securely upload workout videos.
- 🔲 **User Management**: View list of students and their progress.
- 🔲 **Sales Analytics**: View revenue and number of active students.

## 5. Payment System (Paystack)

- 🔄 Students can purchase a course using a card via Paystack.
- 🔄 System creates a `Purchase` record in the database after payment.
- 🔄 Course is automatically unlocked after a successful payment.
- 🔲 Students can view their order history.

---

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: Prisma 7
- **Auth**: JWT + Passport.js
- **Payments**: Paystack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (custom design system)

### Infrastructure
- **Version Control**: Git / GitHub
- **Local Dev**: `npm run start:dev` + `npm run dev`
- **Deployment**: Railway (backend) + Vercel (frontend) — *Planned*
