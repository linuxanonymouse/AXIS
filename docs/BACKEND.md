# Axis Backend

PostgreSQL + Prisma + Next.js API routes. Local DB password: **`passme`**.

## Quick start

```powershell
.\scripts\setup-backend.ps1
npm run dev
```

Open http://localhost:3002/api/health

## Environment (`.env.local`)

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | `postgresql://postgres:passme@localhost:5432/axis` |
| `ADMIN_SECRET` | Admin API header `x-admin-secret` |
| `AUTOMATION_WEBHOOK_URL` | Make.com / n8n |
| `OPENAI_API_KEY` | AI diagnostic scoring |
| `RESEND_API_KEY` + `EMAIL_FROM` | Transactional email |
| `INTERNAL_NOTIFICATION_EMAIL` | Team inbox |
| `CLICKUP_API_TOKEN` + `CLICKUP_LIST_ID` | Task queue |

## Public API

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | DB status + record counts |
| POST | `/api/apply` | Submit diagnostic (simple or full intake JSON) |
| POST | `/api/apply/draft` | Save draft (`draftToken` returned) |
| GET | `/api/apply/draft?token=` | Resume draft |
| POST | `/api/contact` | Contact submission |
| GET | `/api/insights` | List / filter articles |
| GET | `/api/insights?slug=` | Single article |
| POST | `/api/briefs` | Axis Briefs subscribe |

## Admin API

Header: `x-admin-secret: <ADMIN_SECRET>`

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/applications` | List diagnostics |
| GET | `/api/admin/contacts` | List contact submissions |
| GET | `/api/admin/subscribers` | List brief subscribers |
| GET | `/api/diagnostic/:id` | Full diagnostic report |
| GET | `/api/diagnostic/:id?view=client` | Client-facing summary |
| PATCH | `/api/diagnostic/:id` | Update review fields |
| POST | `/api/diagnostic/process` | Run AI on pending (`?id=` optional) |
| POST | `/api/insights` | Create article |
| PATCH | `/api/insights?slug=` | Update article |
| DELETE | `/api/insights?slug=` | Delete article |

## Submit flow

1. `POST /api/apply` → row in `DiagnosticApplication`
2. Webhook `diagnostic_application` (if configured)
3. Background: OpenAI/heuristic scores → DB update
4. Webhook `diagnostic_processed`
5. ClickUp task + Resend emails (if configured)

## npm scripts

| Script | Action |
|--------|--------|
| `npm run db:up` | Start Postgres (Docker) |
| `npm run db:setup` | Migrate + generate + seed |
| `npm run db:test` | Connection test |
| `npm run db:seed` | Sample Insights articles |
| `npm run prisma:studio` | DB GUI |
