# Functional Requirements Document (FRD) - CalisthenicsHub

## 1. User Authentication & Authorization
- Users can register with email and password.
- Users must verify their email before accessing courses.
- Users can log in to receive a JWT (JSON Web Token).
- Two Roles: `STUDENT` (can view purchased content) and `ADMIN` (the instructor).

## 2. Public Marketing Website
- **Hero Section**: High-impact visual + "Join Now" button.
- **Instructor Bio**: Experience, certifications, and branding.
- **Program Preview**: Cards showing available training courses.
- **Testimonials**: Social proof from previous students.
- **Contact Form**: Direct lead generation.

## 3. Student Dashboard
- **My Courses**: List of all purchased programs.
- **Video Player**: High-quality video streaming for lessons.
- **Progress Tracking**: See % completion of each course.
- **Profile Management**: Update name, avatar, and password.

## 4. Admin Dashboard (Instructor Only)
- **Content Manager**: Create/Edit/Delete courses and lessons.
- **Video Uploader**: Securely upload workout videos.
- **User Management**: View list of students and their progress.
- **Sales Analytics**: View revenue and number of active students.

## 5. Payment System (Stripe)
- Students can purchase a course using a credit card.
- System must unlock the course automatically after a successful payment.
- Students can view their order history/receipts.
