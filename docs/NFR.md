# Non-Functional Requirements (NFR) - CalisthenicsHub

> **Last Updated:** June 2026  
> **Status:** 🟢 Refactored for Static Architecture

---

## 1. Performance & SEO (Primary Focus)
- **Static Site Generation (SSG)**: Pages must be pre-rendered at build time for near-instant Time to First Byte (TTFB).
- **Core Web Vitals**: The site must achieve 90+ scores on Lighthouse for Performance, Accessibility, Best Practices, and SEO.
- **Image Optimization**: Must use Next.js `<Image>` component for automatic compression, WebP formatting, and lazy loading.
- **Minimal JavaScript**: Client-side JavaScript should be kept to an absolute minimum to ensure blazing-fast hydration.

## 2. Security & Privacy
- **Zero PII Storage**: The system must NOT store Personally Identifiable Information (PII) such as passwords, addresses, or credit card details.
- **Stateless Architecture**: No session cookies, JWTs, or local storage tokens are required for core functionality.
- **Third-Party Security**: Any third-party embeds (e.g., newsletter forms) must use secure HTTPS protocols and comply with data privacy standards.

## 3. Scalability & Availability
- **Edge Deployment**: The frontend must be deployed on a global Edge Network (e.g., Vercel) to ensure low latency regardless of user geography.
- **100% Uptime Architecture**: By removing the database and backend APIs, the site eliminates its most common points of failure, ensuring maximum availability.

## 4. UI/UX (Aesthetics)
- **Responsive Design**: The app must be "Mobile First" (looks great on a phone in the gym).
- **Dark Mode**: Strictly adheres to the Raycast-inspired "void" dark theme (`#040506`).
- **Micro-interactions**: Hover states, smooth scrolling, and subtle glassmorphism effects must feel premium and fluid (e.g., 60fps animations).

## 5. Maintainability
- **Component Reusability**: UI elements (buttons, cards, navbars) must be modular and reusable.
- **Design System Adherence**: All CSS must utilize the established CSS variables (tokens) defined in `globals.css` rather than hardcoded magic numbers.
