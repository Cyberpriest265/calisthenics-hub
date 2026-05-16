# User Stories - CalisthenicsHub MVP

## 1. Authentication (Core)
**User Story:** As a new student, I want to create an account, so that I can access my training materials.
**Acceptance Criteria:**
- [ ] User can provide email, name, and password.
- [ ] Password must be at least 8 characters.
- [ ] System prevents duplicate emails.
- [ ] User receives a "Registration Successful" message.

## 2. Course Management (Admin)
**User Story:** As an instructor, I want to create a new training course, so that my students can purchase it.
**Acceptance Criteria:**
- [ ] Admin can enter a Title, Description, and Price.
- [ ] Admin can upload a thumbnail image.
- [ ] Course starts in "Draft" mode (not visible to students).

## 3. Viewing Content (Student)
**User Story:** As a student, I want to see a list of my purchased courses, so that I can start training.
**Acceptance Criteria:**
- [ ] Dashboard shows only courses the user has paid for.
- [ ] Clicking a course opens the video player.
- [ ] User can see a progress bar for each course.

## 4. Payment (Stripe)
**User Story:** As a student, I want to pay for a course securely, so that I can get instant access.
**Acceptance Criteria:**
- [ ] User is redirected to a secure Stripe Checkout page.
- [ ] System handles "Payment Success" and "Payment Failed" states.
- [ ] Access is granted immediately after successful payment.
