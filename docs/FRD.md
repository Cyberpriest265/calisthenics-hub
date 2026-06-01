# Functional Requirements Document (FRD) - CalisthenicsHub

> **Last Updated:** June 2026  
> **Status:** 🟢 Refactored for Static Architecture

---

## Architecture Overview
The project has shifted from a complex full-stack SaaS platform to a high-performance, frontend-first marketing website. The primary goal is to showcase the instructor, capture newsletter leads, and redirect users to an external platform for course purchasing and consumption.

No sensitive user data, passwords, or transaction histories are stored on this infrastructure.

---

## 1. Landing Page (Public Marketing Website)

- ✅ **Hero Section**: High-impact visual + CTA button leading to programs or newsletter.
- ✅ **Programs & Coaching Catalog**: Static cards showcasing available programs, coaching packages, and digital products.
- ✅ **Instructor Bio (About)**: Dedicated section for experience, certifications, and personal branding to build trust.
- 🔲 **Testimonials**: Social proof and success stories from previous students.
- 🔲 **Contact Section**: Simple method for inquiries (either a `mailto:` link or a privacy-conscious form service like Formspree).

## 2. External Course Platform Integration

The website acts as a funnel. It **does not** handle payments or host course content.

- ✅ **External Redirects**: All "Buy Now" or "Enroll" buttons must link out to a dedicated third-party platform (e.g., Kajabi, Teachable, Thinkific, Gumroad).
- ✅ **No Local Authentication**: The application contains no login, registration, or dashboard screens. Authentication happens entirely on the external course platform.

## 3. Newsletter Subscription

- 🔲 **Email Capture Form**: A simple, embedded form to capture visitor emails.
- 🔲 **Integration**: Connected to a privacy-conscious email provider (e.g., ConvertKit, Mailchimp, Beehiiv) via API or direct embed.
- 🔲 **Data Minimization**: Collects *only* email addresses (and optionally first name). No passwords or user profiles.

## 4. Mobile Responsiveness & UI/UX

- ✅ **Design System**: Adheres to the established Raycast-inspired dark-mode aesthetic.
- ✅ **Responsive Navigation**: Suspended glassmorphism navbar that adapts smoothly to mobile viewports.
- ✅ **Performance**: Static Site Generation (SSG) ensures near-instant load times across all devices.

---

## Out of Scope (Removed Features)
To minimize security risks and maintenance overhead, the following features have been explicitly removed:
- ❌ User Registration & Login
- ❌ Password Storage & Recovery
- ❌ Internal Payment Processing (Paystack/Stripe integration)
- ❌ User Dashboards & Progress Tracking
- ❌ Admin Panels & Internal Course CMS
- ❌ PostgreSQL Database & ORM
