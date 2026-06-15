
# YouBelong Web App

YouBelong is a React + TypeScript prototype for a community platform focused on youth support and neighborhood connection. This frontend-only project demonstrates a polished UI, public user pages, and an admin workflow built with React Router, Tailwind CSS, and shadcn/ui-inspired styling.

## Key Features

- Public pages: Home, Events, Feedback, Help
- Admin portal with dashboard, users management, feedback management, and events management
- Frontend-only workflows using mock state data
- Role-based demo login page for Community User and Admin
- Consistent card, table, button, and modal styling across the app

## Technology Stack

- React
- TypeScript
- React Router
- Tailwind CSS
- Vite
- lucide-react icons

## Available Pages

- `/` — Home
- `/events` — Events listing
- `/feedback` — Feedback form
- `/help` — Help and FAQ
- `/login` — Demo login page
- `/admin` — Admin dashboard
- `/admin/users` — User management
- `/admin/events` — Events management
- `/admin/feedback` — Feedback management

## Project Structure

- `src/app/App.tsx` — main router and layout handling
- `src/app/components/` — page and shared component files
- `src/app/components/admin/` — admin pages and layout components
- `src/styles/` — Tailwind and theme styling

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL shown in your terminal.

## Admin Demo Flow

- Visit `/login` to access the demo login page.
- Click **Login as Community User** to navigate to the public home page.
- Click **Login as Admin** to navigate to `/admin` and access the admin portal.

## Admin Pages

- **Dashboard** — shows mock metrics, quick actions, and recent activity
- **Users** — manage users, search, create new users, and delete users in local state
- **Events** — view searchable events and manage mock event entries
- **Feedback** — review feedback entries with status badges and actions

## Notes

- There is no backend or persistence in this prototype.
- All data is managed with local React state and mock arrays.
- The purpose is to demonstrate UI flows and admin functionality for a capstone prototype.
  