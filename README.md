# E-Commerce Mobile App

This repository contains a full-stack e-commerce application organized as a monorepo.

The goal of the project is to provide a clean and scalable base for:

- mobile-first shopping experience (Expo app)
- secure authentication and session management (Express backend)
- structured server architecture (schema -> controller -> service -> DAL)
- PostgreSQL-backed persistence with Prisma ORM

The codebase is split into two main apps:

- `backend`: Express + TypeScript + Prisma + PostgreSQL
- `mobile`: Expo + React Native

Both apps can be developed independently, but they are designed to work together as a single product.

## Architecture Overview

- Backend follows layered architecture:
	- request validation with Zod
	- business logic in services
	- database logic in DAL
	- Prisma for typed DB access
- Auth model uses:
	- short-lived access token (Bearer)
	- refresh session persistence in database
	- session revocation on logout and password update
- Mobile app is built with Expo for Android, iOS, and Web development from one codebase.

## Project Structure

```text
.
├─ backend/
└─ mobile/
```

## Prerequisites

- Node.js 20+
- pnpm
- Docker (for PostgreSQL in backend)

## Backend Setup

Backend startup flow:

1. Install dependencies
2. Start PostgreSQL via Docker
3. Apply migrations
4. Start the development server

```bash
cd backend
pnpm install
pnpm run docker:up
pnpm run db:migrate
pnpm run dev
```

Backend runs on `http://<your-local-ip>:3000`.

## Mobile Setup

Mobile startup flow:

1. Install dependencies
2. Start Expo development server
3. Run on device/emulator/web

```bash
cd mobile
pnpm install
pnpm start
```

Then run on Android/iOS/Web via Expo.

## Auth Endpoints (Backend)

Base URL: `http://<your-local-ip>:3000/api/v1`

Important for Expo app: do not use `localhost` from a phone or simulator that needs to reach the backend over the network. Use your machine's LAN IP, for example `http://192.168.1.10:3000/api/v1`.

- `POST /register`
- `POST /login`
- `POST /refresh`
- `POST /logout`
- `PATCH /update-password`

## Typical Auth Flow

1. Register account with `/register`
2. Login with `/login` to get access and refresh tokens
3. Use access token in `Authorization: Bearer <token>` for protected requests
4. Use `/refresh` when access token expires
5. Use `/logout` to revoke refresh session
6. Use `/update-password` to change password and invalidate existing sessions

## Notes

- Access token is used as Bearer token in `Authorization` header.
- Refresh sessions are stored in database and revoked on logout/password update.
