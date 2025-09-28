# Clinic & Gym Booking Backend (Node.js + Express)

This service provides a secure REST API for the clinic/gym booking portal. It exposes authentication, booking management, reminder scheduling, analytics, and chatbot endpoints. The stack uses TypeScript, Express, and Prisma with PostgreSQL.

## Getting Started

```bash
cp .env.example .env
npm install
npm run dev
```

Run database migrations with Prisma before starting the server.

```bash
npx prisma migrate dev
```

## Available Scripts

- `npm run dev` – start development server with hot reload.
- `npm run build` – compile TypeScript to JavaScript.
- `npm start` – run compiled server.
- `npm run lint` – lint codebase.

## API Overview

- `POST /api/v1/auth/signup` – register new member.
- `POST /api/v1/auth/login` – email/password login.
- `POST /api/v1/auth/refresh` – refresh JWT.
- `GET /api/v1/users/me` – current user profile.
- `PATCH /api/v1/users/me` – update profile & preferences.
- `GET /api/v1/bookings/services` – list services/classes.
- `GET /api/v1/bookings/availability` – slot availability.
- `POST /api/v1/bookings` – create booking.
- `PATCH /api/v1/bookings/:id/status` – update booking status.
- `POST /api/v1/bookings/:id/cancel` – cancel within policy window.
- `GET /api/v1/reminders/templates` – admin reminder templates.
- `POST /api/v1/reminders/schedule` – schedule reminder delivery.
- `GET /api/v1/analytics/attendance` – attendance summary.
- `GET /api/v1/analytics/no-show-rate` – no-show metrics.
- `GET /api/v1/analytics/predictive-suggestions` – recommended slots.
- `POST /api/v1/chatbot/query` – AI FAQ assistant.

JWT auth is required for all endpoints except auth routes. Role-based guards protect staff/admin actions.

## Security Practices

- Environment validation with Zod.
- Helmet, CORS, compression, and JSON body limits.
- JWT access tokens (15 min) and refresh tokens (30 days).
- AES-256-GCM helper for field-level encryption.
- Prisma schema aligned with HIPAA/GDPR principles (audit logs, reminders, chatbot sessions).

## Deployment

- Deploy on AWS Fargate, Google Cloud Run, or Azure Container Apps.
- Use managed PostgreSQL (RDS/Cloud SQL) and Redis for queues.
- Store secrets in AWS Secrets Manager / GCP Secret Manager.
- Frontend can be deployed separately (e.g., Vercel).
