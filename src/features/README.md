# Features

A feature is a **vertical slice** of the product. It owns its UI, its state, its
data access and its validation. It is the unit we build, review, test and — when
a bet does not pay off — delete.

## Anatomy

Not every feature needs every folder. Add one when there is something to put in
it, never in advance.

```
features/<name>/
├── components/    UI specific to this feature. Generic UI belongs in components/ui.
├── hooks/         React state and behaviour. One hook per concern.
├── services/      Data access. The only place this feature talks to Supabase.
├── schemas/       Zod schemas — the source of truth for forms AND server validation.
├── types/         Types derived from schemas and database rows.
└── utils/         Pure helpers used by more than one file in this slice.
```

## The dependency rule

```
app  →  features  →  shared
```

- `app/` composes features into routes. It holds no business logic.
- `features/` may import from `shared` and from **itself**.
- `shared/` (`components`, `hooks`, `lib`, `utils`, `constants`, `types`,
  `services`) may never import a feature.

**Features may not import each other.** This is enforced by
`boundaries/element-types` in `eslint.config.mjs`, so a violation fails the
build rather than surviving to review.

When two features genuinely need the same thing, that thing was never
feature-specific — promote it to `shared`. Reaching across the boundary is how
a modular codebase quietly becomes a monolith with extra folders.

## The data rule

UI never calls Supabase directly. The path is always:

```
component  →  hook  →  service  →  supabase
```

Each hop earns its place: the **service** is testable without React, the **hook**
owns caching and invalidation, and the **component** stays a pure function of
its props. Skipping a layer means the query cannot be reused, mocked, or made to
run on the server.

## Planned slices

| Feature         | Owns                                                     |
| --------------- | -------------------------------------------------------- |
| `auth`          | Sign in/up, password reset, session, role selection       |
| `onboarding`    | Post-signup profile completion per account type           |
| `dashboard`     | Role-specific home surfaces and metrics                   |
| `startup`       | Startup profiles, pitch decks, funding progress           |
| `investor`      | Investor profiles, deal flow, portfolio, notes            |
| `accelerator`   | Programmes, applications, cohorts, mentors                |
| `discovery`     | The feed, cards, recommendations, bookmarks               |
| `search`        | Query parsing, filters, results                           |
| `messaging`     | Conversations, realtime delivery, receipts, attachments   |
| `notifications` | Feed, preferences, unread state                           |
| `settings`      | Account, profile, security, billing                       |
| `admin`         | Moderation and internal tooling                           |

Folders are created as each phase builds the slice. An empty directory
documents nothing that this table does not.
