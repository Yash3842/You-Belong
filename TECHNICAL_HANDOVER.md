# You Belong Digital Platform – Technical Handoff Documentation

## 1. Project overview

### Purpose of the platform
You Belong is a capstone frontend prototype designed to connect community members, partner organizations, and homelessness-awareness initiatives. It demonstrates a community-facing interface alongside an admin portal for partner organizations.

### Intended users
- Community members, youth, and residents interested in community events and homelessness awareness
- Partner organization staff (admins) managing events, users, and feedback
- Project stakeholders reviewing the prototype’s UI and workflow

### What problem the prototype addresses
The prototype addresses the need for a simple digital experience to:
- discover community events
- share anonymous feedback
- access help and resources
- provide a staff-facing admin portal for event/user management and feedback review

### Current prototype scope and limitations
- Frontend-only implementation
- No server-side persistence or real backend integration
- Authentication is demo-only and based on hardcoded demo accounts
- Data is mocked in local component state only
- No production-ready security, validation, or real data storage

## 2. Technology stack

### Frameworks / libraries used
- React (UI framework)
- TypeScript (static typing)
- React Router (routing)
- Vite (build tooling)
- Tailwind CSS v4 (styling)
- lucide-react (icons)
- date-fns (date handling, though minimal use)
- shadcn/ui-inspired component utilities under `src/app/components/ui`

### Styling / UI tools
- Tailwind CSS with custom theme variables in `src/styles/theme.css`
- Global CSS imported from `src/styles/index.css`
- Additional Tailwind animations via `tw-animate-css`
- Custom style tokens in `theme.css` for light and dark theme variables

### Routing structure
- `/` — Home page
- `/events` — Public events listing
- `/feedback` — Public feedback form
- `/help` — Help and FAQ page
- `/login` — Demo login page
- `/admin` — Admin dashboard
- `/admin/users` — User management
- `/admin/events` — Events management
- `/admin/feedback` — Feedback management

Admin routes are wrapped inside `RequireAdmin`; public pages are wrapped by `RequireAuth`.

### Build / deployment tools
- Vite for development and production build
- `vite build` for production output
- `vite` for development server
- `vercel.json` includes a rewrite to serve `index.html` for all routes

## 3. Repository structure

### Major folders
- `src/` — application source code
- `src/app/` — main app code and page components
- `src/app/auth/` — authentication context and route guards
- `src/app/components/` — public pages, shared navigation, and admin pages
- `src/app/components/admin/` — admin portal pages and layout
- `src/app/components/ui/` — reusable UI primitives and helpers
- `src/styles/` — Tailwind, theme, fonts, and base styles

### Important files
- `src/app/App.tsx` — main router, auth provider, and top-level layout logic
- `src/main.tsx` — React root bootstrap
- `package.json` — dependencies and scripts
- `vite.config.ts` — build config and alias setup
- `vercel.json` — rewrite rule for SPA deployment
- `README.md` — project summary and quick start

### Pages and layouts
- `src/app/components/HomePage.tsx` — landing page
- `src/app/components/EventsPage.tsx` — public events page
- `src/app/components/FeedbackPage.tsx` — public feedback form
- `src/app/components/HelpPage.tsx` — help page and FAQ section
- `src/app/components/LoginPage.tsx` — demo login page
- `src/app/components/Nav.tsx` — public site nav bar
- `src/app/components/admin/AdminLayout.tsx` — admin portal layout and header
- `src/app/components/admin/AdminNav.tsx` — admin navigation tabs
- `src/app/components/admin/AdminDashboard.tsx` — admin overview page
- `src/app/components/admin/UsersPage.tsx` — user management page
- `src/app/components/admin/EventsAdminPage.tsx` — event management page
- `src/app/components/admin/FeedbackAdminPage.tsx` — feedback management page

### Data and mock files
- Mock/demo account data lives in `src/app/auth/AuthContext.tsx`
- Public events data lives in `src/app/components/EventsPage.tsx`
- Admin event/user/feedback mock data lives inside the respective admin page components

### Configuration files
- `package.json` — install/build scripts
- `pnpm-workspace.yaml` — monorepo references if used with pnpm
- `vite.config.ts` — alias, plugin, asset settings
- `tsconfig.json`, `tsconfig.node.json` — TypeScript settings
- `vercel.json` — SPA rewrite for Vercel deploy

## 4. Current implemented features

### Public pages
- Home page with hero section, feature cards, and calls to action
- Events page with city-based filter and event cards
- Feedback page with anonymous submission form and success confirmation
- Help page with process steps, FAQ accordion, and contact buttons

### Login / role-routing behavior
- Demo login page with email/password form
- Hardcoded demo account list with centre names, admin/user roles, and passwords
- Redirects:
  - Admin users to `/admin` or original admin destination
  - Community users to `/` or original public destination
- Session persisted in `sessionStorage`
- `RequireAuth` protects public pages and redirects unauthenticated users to `/login`
- `RequireAdmin` protects `/admin` routes and shows an access warning for non-admin users

### Admin dashboard
- Overview cards for metrics (total events, upcoming events, feedback, community members)
- Quick action buttons (UI-only)
- Recent activity list (mock data)

### User management
- Searchable user table
- Add user modal with client-side validation
- Delete confirmation modal
- Status badges for Active / Pending / Suspended
- Role labels for Organizer / Volunteer / Member
- No backend persistence, changes remain in component state

### Event management
- Searchable event table
- Create event modal with form validation
- Edit event modal via existing item prefill
- View event details modal
- Delete event confirmation
- Status tags for Upcoming / Full / Completed / Draft
- Mock registration and capacity fields
- State updates are local only

### Feedback management
- Searchable feedback table
- Inline status badge display
- View button (UI only) and mark resolved action
- Mock feedback items stored in component state
- Filtering by query text

### Help / resources sections
- FAQ expandable items
- Step-by-step “How it works” section
- Contact CTA links for email and phone, implemented as prototype interface elements

### Mock data / placeholder behavior
- Demo auth accounts are hardcoded in `AuthContext.tsx`
- Event listings in `EventsPage.tsx` are static local arrays
- Admin pages use local mocked state arrays for events, users, and feedback
- Feedback form submission is local and resets the form without saving

## 5. User flows

### Community member flow
1. Visit `/login`
2. Sign in with a demo community account
3. Access the public home page
4. Browse events via `/events`
5. Submit feedback via `/feedback`
6. Access help via `/help`

### Admin / partner organization flow
1. Visit `/login`
2. Sign in with a demo admin account
3. Access `/admin`
4. View dashboard metrics and recent activity
5. Manage users under `/admin/users`
6. Manage event listings under `/admin/events`
7. Review comments under `/admin/feedback`

### Feedback flow
- Community user fills feedback form on `/feedback`
- Success screen appears locally after submission
- Admin can review mocked feedback entries on `/admin/feedback`
- Admin can mark feedback items as resolved

### Event management flow
- Admin opens `/admin/events`
- Search events or use table actions
- Create new event via modal form
- Edit existing events via modal form
- Delete event with confirmation
- View event details in a modal

### Login / navigation flow
- Public top nav appears on non-admin pages only
- Admin layout nav appears on `/admin` pages
- `RequireAuth` enforces login for public pages
- `RequireAdmin` enforces admin access for admin pages

## Demo Accounts
The prototype uses demonstration accounts only. These demo accounts are intended for testing the interface and for presentations, not for production use. All demo credentials must be replaced with a secure authentication system before deployment.

### Demo account types
| Role | Purpose |
| --- | --- |
| Community User | Browses events, submits feedback, and accesses public site content |
| Admin / Partner Organization User | Reviews feedback, manages events, and manages partner-facing administration pages |

## 6. How to run the project locally

### Prerequisites
- Node.js installed
- pnpm installed or use npm/yarn as appropriate

### Installation commands
From repository root:
```bash
pnpm install
```
If `pnpm` is unavailable, use:
```bash
npm install
```

### Development server command
```bash
pnpm dev
```

### Build command
```bash
pnpm build
```

### Preview command
Vite does not include a dedicated preview script in `package.json`, but you can use:
```bash
npx vite preview
```
Or `pnpm exec vite preview` if you are using pnpm.

### Common troubleshooting issues
- Ensure `node_modules` are installed successfully
- The app uses Vite alias `@` for `src`; if alias resolution fails, check `vite.config.ts`
- The SPA rewrite in `vercel.json` is required for direct `/admin/*` deep links on Vercel
- If login appears blocked, verify the email/password matches the hardcoded accounts in `AuthContext.tsx`

## 7. Deployment notes

### Current deployment assumptions
- This is a static SPA delivered by Vite
- The app is currently configured for static hosting with a frontend router
- No serverless or backend API is currently integrated

### Vercel / Netlify deployment steps if applicable
For Vercel:
- Push repository to GitHub
- Connect project in Vercel
- Build command: `pnpm build` (or `npm run build`)
- Output directory: `dist`
- `vercel.json` already rewrites all routes to `index.html`

For Netlify:
- Build command: `pnpm build`
- Publish directory: `dist`
- Add redirect rule to `netlify.toml` or `_redirects` for SPA routing if necessary

### Environment variables, if any
- Currently none are required by the codebase
- `vite.config.ts` reads `VITE_BASE_PATH` for base routing; this may be set when deploying to a subpath

### Known deployment limitations
- No backend means no persistent login or data storage
- `sessionStorage` is used for session state; user is signed out on browser restart or new tab without session data
- All “management” actions are ephemeral and reset on page reload

## 8. Data and backend status

### Current backend status
- No real backend or API exists
- All data is static or stored in local React state
- Authentication is demo-only with hardcoded accounts
- Feedback submission does not persist beyond the current session

### What would be required to add a real backend / database
- Replace `AuthContext.tsx` authentication with API calls to a backend auth service
- Add persistent data storage for users, events, and feedback
- Move mock arrays from component state into data-fetching hooks or services
- Implement API clients or data stores in a shared service layer
- Add secure session management, token refresh, and role-based authorization on the server

### Suggested future database tables or API endpoints
Potential backend resources:
- `users` table: id, name, email, role, status, organization, createdAt
- `events` table: id, name, category, date, time, location, capacity, description, status, registeredCount
- `feedback` table: id, title, category, submitted_by, message, date, status
- `auth` endpoints: `/login`, `/logout`, `/me`
- `events` endpoints: `GET /events`, `POST /events`, `PUT /events/:id`, `DELETE /events/:id`
- `users` endpoints: `GET /users`, `POST /users`, `PUT /users/:id`, `DELETE /users/:id`
- `feedback` endpoints: `GET /feedback`, `POST /feedback`, `PUT /feedback/:id`

## 9. Accessibility and UX notes

### Current accessibility considerations
- Form labels are present for input fields
- Buttons and links use readable text
- Color contrast is generally supported by Tailwind theme variables
- FAQ uses keyboard-accessible button toggles

### Known gaps
- No explicit `aria-` attributes for modal dialogs or status messages
- Modal focus trap behavior is not implemented
- No skip navigation links or landmark roles
- No screen-reader announcements for state changes
- Input validation messages are basic and not always associated with `aria-describedby`

### Recommendations for future improvement
- Add accessible modal/trap components or use a library with built-in accessibility support
- Add explicit `aria-label` and `aria-describedby` attributes on interactive controls
- Improve keyboard navigation for table actions and modal dialogs
- Validate color contrast against WCAG AA for all text/background combinations
- Add focus management after route changes and form submission

## 10. Security and privacy considerations

### Current prototype limitations
- The current prototype uses demo-only credentials stored in the frontend source code for demonstration purposes. These accounts must be replaced with secure authentication and authorization mechanisms before any real-world deployment.
- No backend security controls are implemented because the prototype is frontend-only. Any future deployment must use HTTPS, secure backend APIs, and protected data storage.
- No real access control beyond client-side route guards
- Session state is stored in `sessionStorage`

### Login / auth limitations
- Login is not secure and should only be used for demo purposes
- Role checks happen in the browser only and can be bypassed by editing client code
- There is no password reset, account verification, or MFA

### Feedback / data privacy concerns
- Feedback form data is only stored temporarily and does not transit to a backend
- User-submitted content is not stored or protected beyond page session state
- Contact email and phone links are provided as prototype interface elements and do not represent a supported helpdesk integration
- The design currently includes contact email/phone, but no privacy policy or data retention guidance

#### Feedback and privacy considerations
- Feedback submitted by community members is handled locally in the browser and is not persisted to any service.
- The platform targets a sensitive user group, so any future deployment should address privacy considerations for vulnerable populations.
- Consent requirements should be defined before collecting identifiable or sensitive information.
- Data retention policies must be established for feedback, event participation, and support inquiries.
- A future privacy policy should explain how data is collected, used, reviewed, and deleted.

### What must be implemented before real partner/community use
- Real backend authentication with secure password storage or OAuth
- Role-based authorization enforced server-side
- Data validation and sanitization on backend/API
- Privacy policy and consent mechanisms
- Secure session handling and logout flows
- Logging and audit controls for admin actions

## 11. Maintenance guide

### How future developers can add a page
1. Add a new component in `src/app/components/`
2. Update `src/app/App.tsx` with a new `Route`
3. Add nav links in `src/app/components/Nav.tsx` or `src/app/components/admin/AdminNav.tsx`
4. Add related styles or utility markup in `src/styles`

### How to add / update events
- Public event cards are defined in `src/app/components/EventsPage.tsx` as the `events` array
- Admin management events are initialized in `src/app/components/admin/EventsAdminPage.tsx` as `initialEvents`
- Update or add event items directly in those arrays for prototype content changes
- Event CRUD behavior in admin is local state only; adding a real backend requires service integration

### How to update navigation
- Public nav: `src/app/components/Nav.tsx`
- Admin nav: `src/app/components/admin/AdminNav.tsx`
- Add or remove links, update active link styles, and preserve `NavLink` route paths

### How to modify admin pages
- `AdminLayout.tsx` controls admin header and layout
- Admin pages each live under `src/app/components/admin/`
- Shared UI components are available in `src/app/components/ui/`
- When modifying behavior, keep local state management patterns consistent and consider extracting common table/modal patterns

### How to update styling / components
- Tailwind utility classes are used throughout pages and components
- Theme variables are in `src/styles/theme.css`
- Shared UI primitives can be reused from `src/app/components/ui/`
- Use `src/styles/index.css` to import fonts and theme CSS
- Vite alias `@` resolves to `src` via `vite.config.ts`

## 12. Known issues and future improvements

### Bugs or incomplete features found in the current code
- `FeedbackAdminPage` uses a `useState` call to sync `items` with `filtered`; this is not idiomatic and may lead to stale state
- `UsersPage` edit/view buttons are UI-only and do not implement actual edit workflows
- `EventsAdminPage` view & edit actions work locally, but registration counts and status are not tied to actual attendance workflows
- `RequireAdmin` does not differentiate between authenticated non-admin and unauthenticated access beyond UI messaging
- Feedback form is not stored or visible outside the success state

### Missing backend / auth
- No backend persistence for events, users, or feedback
- No secure authentication or data access control
- No API layer or service abstraction

## 13. Ownership and Governance Considerations
- The student team is handing over a prototype, not an actively maintained production service.
- A partner organization or future project owner should be identified to maintain the platform after handoff.
- Responsibilities for the ongoing owner include:
  - user administration
  - content moderation
  - event management
  - feedback review
  - data governance
- The future owner should also establish maintenance processes, support channels, and deployment oversight.

### Suggested technical roadmap
1. Add backend API with authentication and data persistence
2. Convert mock arrays into API-driven data sources
3. Implement server-side authorization and role management
4. Build reusable modal, table, and form components for better maintainability
5. Add accessibility/a11y improvements and keyboard support
6. Add unit and integration tests for critical flows

### Priority improvements for partner handoff
- Replace hardcoded auth with real login API
- Persist events, users, and feedback in a backend database
- Add secure admin actions and request validation
- Improve accessibility and mobile keyboard navigation
- Add proper dev/prod configuration for environment variables

## 14. Partner handoff summary

### What currently works
- Public pages for home, events, feedback, and help
- Admin dashboard layout and navigation
- Event management prototype with create/edit/delete workflows in local state
- Feedback management prototype with review and resolve actions in local state
- Navigation, login routing, and role-based page access controls

### What is prototype-only
- Authentication is implemented as hardcoded demo credentials in frontend source
- User management and event/feedback changes are stored only in local React state
- No backend persistence, API integration, or database storage
- No server-side authorization or secure role enforcement
- Contact links and support CTA elements are interface-only prototypes

### What must be completed before deployment
- Backend development and secure API integration
- Persistent database storage for users, events, and feedback
- Secure authentication, authorization, and session management
- Privacy compliance, consent mechanisms, and data governance
- Ownership assignment, maintenance responsibility, and support operations
- Production-grade security controls, validation, and monitoring

---

This document is based solely on the current implementation in this repository.
