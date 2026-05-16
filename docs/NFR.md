# Non-Functional Requirements (NFR) - CalisthenicsHub

## 1. Security
- **Password Hashing**: All passwords must be hashed using `bcrypt` (never store plain text).
- **Authentication**: Stateless authentication using JWT (JSON Web Tokens).
- **Authorization**: Role-Based Access Control (RBAC) to ensure students can't access admin panels.
- **Data Protection**: All sensitive database credentials must stay in `.env` files.

## 2. Performance
- **API Response Time**: Core API endpoints should respond in under 200ms.
- **Image Optimization**: Frontend must use Next.js `<Image>` component for automatic compression.
- **Database Indexing**: Frequently searched columns (like email) must be indexed.

## 3. Scalability
- **Statelessness**: The backend should be stateless so we can run multiple instances if traffic grows.
- **Relational Integrity**: Use PostgreSQL with foreign keys to ensure data remains consistent.

## 4. Availability & Reliability
- **Error Handling**: Every API error must return a standard JSON format (no server crashes).
- **Validation**: Use `class-validator` on the backend to reject bad data before it hits the database.

## 5. UI/UX (Aesthetics)
- **Responsive Design**: The app must be "Mobile First" (looks great on a phone in the gym).
- **Dark Mode**: Fitness apps should have a sleek dark/premium theme.
- **Loading States**: Use "Skeletons" so the user never sees a blank screen while data is fetching.
