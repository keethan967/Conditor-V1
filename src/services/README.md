# Services

Cross-cutting infrastructure that more than one feature depends on — file
storage, transactional email, realtime channel management, the AI provider.

**Domain data access does not live here.** Fetching startups belongs in
`features/startup/services/`. If only one feature will ever call it, it is not
cross-cutting, and putting it here just moves the coupling somewhere harder to
see.

Everything in this folder is framework-agnostic: plain functions, no React, no
hooks. That is what makes it testable without a renderer and callable from
Server Actions, Route Handlers and background jobs alike.
