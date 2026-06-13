# Sellsword Software Website

## Audience

This document is for maintainers of the website repo. After reading it, a maintainer should understand what the site is supposed to communicate, what is intentionally simple about the implementation, and what product gaps still remain.

## Product Goal

Sellsword Software needs a public website that does three jobs:

- establish the publisher brand around software ownership and anti-subscription values
- present the current MIT-licensed projects in one coherent catalog
- act as a real example of NAF and NASS being used in a plain static site

The site is intentionally low-complexity:

- real HTML files for routes
- static hosting
- no backend
- no analytics
- no accounts
- only a tiny amount of client-side enhancement

## Primary Message

**Software you own. Period.**

Visitors should leave with three clear impressions:

- Sellsword Software rejects SaaS lock-in and treats ownership as a product requirement.
- The company already ships real tools, not just opinions.
- The site itself is intentionally plain and static rather than framework-driven.

## Users And Needs

### Visitors

Visitors should be able to:

- understand the ownership-focused positioning immediately on the home page
- browse the current project lineup without leaving the site
- open a project detail page and see what it is, what state it is in, and where its repo/docs/releases live
- tell that commercial products are planned, even though none are listed yet

### Maintainers

Maintainers should be able to:

- edit route content directly as normal HTML files
- keep the site deployable as static files on any ordinary web server
- make small interactive enhancements only when they are actually needed, without turning the site into an app shell

## Current Product Shape

The live repo currently implements:

- a static multi-page site with literal HTML files for public routes
- a shared visual shell repeated across those pages
- a home page with hero copy, philosophy pillars, project cards, and a commercial placeholder
- dedicated pages for projects, products, about, and per-project detail pages
- light and dark themes powered by NASS and a tiny persisted client-side enhancement
- SEO metadata and structured data embedded directly in the HTML pages

## Information Architecture

Current routes:

- `/`
- `/projects/`
- `/projects/naf/`
- `/projects/nass/`
- `/projects/justbookmarks/`
- `/projects/justpeek/`
- `/products/`
- `/about/`

The navigation exposed to users is:

- Home
- Projects
- Products
- About

## Content Model

Content is currently authored directly in the HTML files. Project detail pages include:

- name
- one-line summary
- license
- status
- description
- feature list
- install/use section
- repo/docs/releases links
- screenshots or placeholders
- per-page SEO metadata
- project-specific structured data

## Visual And Brand Direction

The repo currently uses:

- NASS foundation and theme entrypoints
- custom site CSS layered on top
- a text-only brand treatment
- a dark default theme with a persisted light-mode toggle

Still intentionally unfinished:

- favicon
- logo or brand mark beyond text
- self-hosted typography choice
- final non-placeholder media for some project pages

## Non-Goals

These remain out of scope:

- blog or editorial system
- contact form or server-side submissions
- analytics or tracking
- accounts or authentication
- search
- legal/commercial purchase flows before products exist

## Acceptance Criteria

The site should be considered aligned with this brief when:

- all public routes render cleanly in the browser
- the theme toggle works without visual breakage
- each project detail page includes meaningful evaluation content, including media
- project links resolve correctly
- the site remains usable on a mobile viewport
- the messaging consistently reinforces ownership rather than subscription dependency

## Remaining Product Gaps

The most important open items are:

- replace placeholder media for NAF, NASS, and JustPeek with final captures or artwork
- add favicon and brand asset decisions
- decide whether to keep system fonts or move to self-hosted typography
- perform browser-level verification for routes, console cleanliness, theme persistence, links, and mobile layout
