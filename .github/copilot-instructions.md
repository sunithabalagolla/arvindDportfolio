# Copilot Instructions for arvindDportfolio

## Project Overview
This is a full-stack portfolio and event management system with a React + Vite frontend and a Node.js/Express/MongoDB backend. It supports user authentication (including OTP), event management, feedback, shopping, and volunteer features.

## Architecture & Key Patterns
- **Frontend** (`frontend/`):
  - Built with React, Vite, and Tailwind CSS.
  - Pages are in `src/pages/`, components in `src/components/`, and context in `src/context/`.
  - API calls are abstracted in `src/utils/api.js`, `eventApi.js`, `feedbackApi.js`, and `shopApi.js`.
  - Routing is managed via `react-router-dom` in `src/routes/AppRoutes.jsx`.
  - Auth state is managed via `src/context/AuthContext.jsx`.
  - Use the provided UI/UX patterns (see `Login.jsx`, `Header.jsx`, etc.) for forms, error handling, and loading states.

- **Backend** (`backend/`):
  - Express server entry: `server.js`.
  - MongoDB connection: `config/database.js`.
  - Email/OTP: `config/email.js`, `utils/sendEmail.js`, `utils/generateOTP.js`.
  - Main business logic in `controllers/` (auth, events, feedback, cart, wishlist).
  - Models in `models/` (User, OTP, Event, etc.).
  - API routes in `routes/` (auth, otp, events, feedback, volunteer, products).
  - Middleware for auth and validation in `middleware/`.
  - Migrations in `migrations/` (e.g., `addStatusFields.js`).

## Developer Workflows
- **Frontend**:
  - Start dev server: `npm run dev` (in `frontend/`)
  - Build: `npm run build`
  - Lint: `npm run lint`
  - Preview: `npm run preview`
- **Backend**:
  - Start dev server: `npm run dev` (in `backend/`)
  - Start production: `npm start`
  - Environment config: `.env` (DB URL, email credentials, JWT secret)

## Conventions & Patterns
- **API Integration**: Use the utility files in `frontend/src/utils/` for backend communication. Do not call backend endpoints directly in components.
- **Auth Flow**: Use the `useAuth` hook and context for login, signup, and protected routes. See `Login.jsx` and `ProtectedRoute.jsx` for examples.
- **Error Handling**: Display errors in UI using state (see `Login.jsx`). Backend errors should be sent as JSON with a `success` flag and `message`.
- **Component Structure**: Prefer splitting UI into reusable components under `src/components/`.
- **Styling**: Use Tailwind CSS classes. Global styles in `src/index.css`.
- **Data Models**: MongoDB schemas are in `backend/models/`. Extend via migrations in `backend/migrations/`.
- **Testing**: No formal test setup yet; add tests in future under `backend/tests/` or `frontend/src/__tests__/`.

## Integration Points
- **OTP & Email**: OTP generation and email sending are handled in backend (`utils/generateOTP.js`, `utils/sendEmail.js`).
- **Event/Feedback/Shop APIs**: Use corresponding API utility files in frontend for all requests.
- **Volunteer & Cart/Wishlist**: Managed via dedicated controllers and routes in backend.

## External Dependencies
- **Frontend**: React, Vite, Tailwind, Axios, Lucide, Framer Motion, Swiper, React Router.
- **Backend**: Express, Mongoose, Nodemailer, JWT, bcryptjs, dotenv, helmet, node-cron.

## Example: Adding a New Feature
1. **Backend**: Add model/controller/route in `backend/`.
2. **Frontend**: Add API utility, component/page, and update routing.
3. **Connect**: Use API utility in component, handle loading/error states as in existing pages.

---

For questions or unclear patterns, review `README.md` files and key source files listed above. Ask for feedback if any workflow or pattern is ambiguous.
