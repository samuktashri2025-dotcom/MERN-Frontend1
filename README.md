# Dance School Management

A React single-page app based on the Maple Floor Dance School website. It uses Vite and React Router.

## Run locally

1. Install Node.js.
2. In this folder, run `npm install`.
3. Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend API base URL.
4. Run `npm run dev`.

## API endpoints

The forms send JSON with `fetch` to these endpoints, prefixed with `VITE_API_URL`:

- `POST /auth/register` — `{ name, email, password, classInterest }`
- `POST /auth/login` — `{ email, password }`
- `POST /auth/forgot-password` — `{ email }`
- `POST /contact` — `{ name, email, topic, message }`

The backend should return a non-error HTTP status for successful requests and JSON containing a `message` or `error` on failures where possible. Authentication and account data must be stored and secured by the backend; this frontend does not persist passwords or simulate account storage.

## Backend API

The Express/MongoDB backend lives in [`backend sample2`](./backend%20sample2/README.md). Set the root `.env` file's `VITE_API_URL` to `http://localhost:3000/api` (the current value), then start MongoDB and the backend:

1. In `backend sample2`, run `npm install`.
2. Copy `.env.example` to `.env`; set a random `JWT_SECRET` of at least 32 characters and verify `MONGODB_URI`.
3. Run `npm run dev`.
4. To create the first administrator, set `ADMIN_NAME`, `ADMIN_EMAIL`, and a strong `ADMIN_PASSWORD` in the backend environment, then run `npm run create-admin`.

The frontend stores the returned login token in session storage and attaches it to authenticated API requests. Configure SMTP settings in the backend environment to email password reset links; in development without SMTP, the link is printed in the backend console.
