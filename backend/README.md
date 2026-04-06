# E-Commerce Mobile App Backend

Backend API for the e-commerce mobile application built with **Node.js**, **Express**, **TypeScript**, **Zod**, **Prisma**, and **PostgreSQL (Docker)**.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **Validation:** Zod
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Containerization:** Docker

---

## Architecture Flow

```text
Client Request
   ↓
Route
   ↓
Controller
   ↓
Zod Validation (Schema)
   ↓
Service (business logic)
   ↓
DAL / Repository (DB access layer)
   ↓
Prisma Client
   ↓
PostgreSQL (Docker)
```

---

## Auth Signup Flow (Detailed)

```text
POST /auth/signup
   ↓
auth.routes.ts
   ↓
signupController(req, res)
   ↓
SignUpSchema.parse(req.body)
   ├─ Valid → signupService(validatedData)
   └─ Invalid → ZodError → 400 (Validation failed)
                 errors: z.treeifyError(error)
   ↓
signupService()
   ├─ hash password
   ├─ check/create user logic
   └─ call DAL
   ↓
DAL (Prisma queries)
   ↓
Database write
   ↓
201 Created (success response)
```

---

## Error Handling Flow

```text
Validation error (ZodError)  -> 400 Bad Request
Business/service error        -> 4xx (as applicable)
Unhandled/internal error      -> 500 Internal Server Error
```

---

## Mobile Auth Architecture (Access + Refresh)

1. Client sends login request to `POST /signin` with email and password.
2. Server validates credentials and returns:
   - `accessToken` (short expiry)
   - `refreshToken` (long expiry)
3. Mobile app stores:
   - `accessToken` in memory
   - `refreshToken` in secure storage (Keychain / Keystore)
4. Client calls protected APIs with header:
   `Authorization: Bearer <accessToken>`
5. Server verifies access token before route execution.
6. When access token expires, client calls refresh endpoint to get a new access token.
7. Refresh token is rotated on refresh (new token issued, old one invalidated).

### Security Rules

- Keep access token lifetime short.
- Use HTTPS in production.
- Rotate refresh token on every refresh call.
- Revoke refresh token on logout.

---

## Project Structure (Example)

```text
src/
├─ controllers/
├─ routes/
├─ schema/
├─ services/
├─ dal/
├─ lib/
└─ app.ts
```

---

## Run Locally

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start PostgreSQL with Docker (example):

   ```bash
   pnpm run docker:up
   ```

3. Run Prisma migrations:

   ```bash
   pnpm run db:migrate
   ```

4. Start development server:
   ```bash
   pnpm run dev
   ```

---

## Notes

- Keep validation in **schema/controller boundary**.
- Keep business logic in **services**.
- Keep database queries in **DAL**.
- Return consistent API response format for success/error.
