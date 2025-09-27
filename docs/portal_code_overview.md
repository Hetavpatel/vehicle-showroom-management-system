# WellNest Booking Portal Code Overview

This repository now includes a working reference implementation of the clinic/gym booking portal described in `docs/clinic_gym_booking_design.md`. The solution is split into a React + Vite frontend and a FastAPI backend, both under the `portal/` directory.

## Frontend (`portal/frontend`)

* **Stack**: React 18, TypeScript, Vite, Material UI, React Query, and the MUI X date pickers package.
* **App shell**: `src/main.tsx` wires up theming, React Query, router, and authentication context providers.
* **Routing**: `src/App.tsx` defines lazy-loaded routes for landing, authentication, member portal, admin, analytics, reminders, and help center pages.
* **State & services**:
  * `src/hooks/useAuth.ts` manages JWT-based auth state, token persistence, and helpers for OAuth or email logins.
  * `src/services/*.ts` modules provide API clients (auth, bookings, reminders, analytics, resources, chatbot) with response normalization helpers.
* **UI pages**: `src/pages/` includes individual page components for every flow covered in the blueprint (landing, login/register, dashboard, bookings, classes, clinicians, profile, reminders, analytics, admin, and help center with chatbot).
* **Shared components**: `src/components/` hosts layout scaffolding, auth guards, and loading indicators.

## Backend (`portal/backend`)

* **Stack**: FastAPI with SQLAlchemy models, JWT auth utilities, and stubbed integrations for availability, reminders, analytics, and chatbot flows.
* **Configuration**: `app/core/config.py` centralizes environment-driven settings (API prefix, tokens, database URLs, CORS origins).
* **Database layer**: `app/models/` defines SQLAlchemy models for users, clinicians, classes, bookings, and reminders. `app/database.py` exposes an async session dependency using SQLAlchemy 2.x.
* **Security helpers**: `app/utils/security.py` handles password hashing and JWT creation/verification.
* **Routers**: `app/routers/` contains FastAPI routers for auth, bookings, availability, resources, reminders, analytics, admin, and chatbot endpoints. The implementations focus on clarity and demo-ready logic that can be swapped for production services.
* **Application entrypoint**: `app/main.py` initializes the FastAPI app, adds CORS middleware, and registers all routers under the `/api` prefix.

## Getting Started

1. **Install dependencies**
   * Frontend: `cd portal/frontend && npm install`
   * Backend: `cd portal/backend && poetry install` (or use `pip install -r requirements.txt` if preferred).
2. **Run services**
   * Backend API: `poetry run uvicorn app.main:app --reload`
   * Frontend: `npm run dev` (Vite will proxy `/api` requests to the backend during development).
3. **Authentication**
   * Register a new account via the `/register` page. Login persistence uses localStorage-stored JWT access & refresh tokens.
4. **Extending**
   * Replace the stubbed routers (analytics, reminders, chatbot, resources) with real integrations.
   * Connect `app/database.py` to a live PostgreSQL instance and run migrations using Alembic.

This codebase is designed to be readable and easily adaptable for production deployments on platforms such as Vercel (frontend) and Render/AWS/GCP (backend). Refer to the existing blueprint for deeper architectural guidance.
