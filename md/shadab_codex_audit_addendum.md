# Shadab Chow Repo Audit — Codex Addendum

## Purpose

This Markdown addendum captures the strongest ideas from the Codex audit that should be added to the earlier Claude-based audit document.

Claude gave the stronger broad audit. Codex adds stronger **implementation product strategy** for turning the Shopify Turbo theme into a real investigative journalism platform.

The best final direction is:

- **Claude = what is broken and why**
- **Codex = what product systems to build next**

---

# 1. Product Framing Problem

The site should not be treated as a Shopify store with a blog attached.

It should be treated as a **newsroom product powered by Shopify**.

## Current Issue

The site currently reads like:

> A strong personal-brand landing page bolted onto a Turbo storefront.

That is the core product problem.

## What This Means

The current setup has:

- Strong personal-brand homepage direction
- Weak newsroom infrastructure
- Storefront patterns still visible
- Article/search/SEO systems still shaped like ecommerce
- Technical payload still carrying Shopify store assumptions
- Navigation and information architecture that do not fully behave like a publication

## Goal

Move the site from:

> Personal homepage with blog features

to:

> Independent investigative newsroom platform centered around Shadab Chow

---

# 2. Homepage Journalism-First Hierarchy

The homepage should lead with journalism, not founder biography or company background.

Right now, the strongest reporting/news signal appears too late. A visitor should immediately understand that this is an independent investigative journalism and breaking-news platform.

## Recommended Homepage Order

1. Breaking / latest story module
2. Newsroom mission statement
3. Credibility strip
4. Submit a Tip CTA
5. Latest investigations
6. Crime / corruption / public accountability sections
7. About Shadab
8. UpCube / founder background

## Recommended Homepage Positioning

Use clearer newsroom-first language.

Example:

> Independent investigations, breaking news, crime reporting, corruption coverage, and public accountability by Shadab Chow.

## Why This Matters

A reader landing from a crime, corruption, or breaking-news story needs immediate context.

They should know:

- Who runs the site
- What the site covers
- Why the site exists
- Where the latest stories are
- How to submit a tip
- Why the reporting should be trusted

---

# 3. Blog Index Upgrade

The blog index should not be a flat grid where every story has equal weight.

Newsrooms need hierarchy.

## Add

- Pinned lead story
- Larger feature card for top investigation
- Smaller cards for regular updates
- Beat/category tags
- Excerpt/deck
- Author
- Updated timestamp
- Urgency state

## Urgency States

Use labels such as:

- Breaking
- Developing
- Exclusive
- Updated
- Investigation
- Video
- Opinion

## Why This Matters

A flat blog grid feels like a basic blog.

A hierarchy-based archive feels like a newsroom.

The blog page should help readers instantly understand what is most important.

---

# 4. Reusable Newsroom Components

This is one of the most important Codex additions.

Create reusable snippets/sections for consistent reporting structure.

## Recommended Components

### Developing Story Label

Used when a story is still changing.

Example text:

> Developing Story: This report may be updated as new information becomes available.

### Exclusive Video Label

Used when a post includes original or exclusive footage.

Example text:

> Exclusive Video: Footage published by Shadab Chow. Context and source notes are provided below.

### Viewer Discretion Warning

Used for violent, graphic, disturbing, or sensitive footage.

Example text:

> Viewer Discretion Advised: This article may contain graphic or disturbing material related to crime, violence, or public safety.

### Source Note Box

Used to explain where information, images, or video came from.

Fields:

- Source
- Date obtained
- Verification status
- Context
- Limitations

### Evidence / Context Box

Used for crime, corruption, or developing stories.

Fields:

- What the evidence shows
- What it does not prove
- Why it matters
- Current status

### What We Know

A concise fact list for breaking stories.

### What We Don’t Know

A concise uncertainty list for breaking stories.

### Correction / Update Note

Used when stories are corrected or materially updated.

### Submit a Tip CTA

Placed at the end of investigative stories.

Example:

> Have information about this story? Submit a tip securely.

### Allegations / Legal Status Disclaimer

Used when reporting on accusations, arrests, investigations, lawsuits, or unproven claims.

Example:

> Allegations are not findings of guilt. Individuals named in this report are presumed innocent unless proven otherwise in court.

## Why These Components Matter

They create:

- Editorial consistency
- Legal restraint
- Better reader trust
- Better story structure
- Faster publishing workflow
- More professional article pages

---

# 5. Protected Tip Workflow

The current contact form is not enough for sensitive investigative tips.

A serious investigative site should have a dedicated Submit a Tip page.

## Add a Dedicated Submit a Tip Page

The page should include:

- Clear confidentiality language
- Warning not to send illegal material
- Guidance for sensitive sources
- Separate fields for name, email, phone, anonymous tip, documents/media links
- Optional Signal contact instructions
- Optional ProtonMail contact instructions
- Statement explaining that submission does not guarantee publication
- Statement explaining that the site may not be able to respond to every tip
- Basic legal/safety disclaimer

## Suggested Page Sections

1. Submit a Tip
2. What to Send
3. What Not to Send
4. Source Protection Notice
5. Anonymous Tips
6. Contact Methods
7. Upload/Link Evidence
8. Final Disclaimer

## Why This Matters

For crime, corruption, and public accountability reporting, the tip workflow is core infrastructure.

A generic contact page does not communicate enough seriousness or safety.

---

# 6. News Video Module

Video posts should not be raw embeds only.

Since the site may publish exclusive footage, crime clips, public safety videos, or developing-story footage, each video should have proper editorial framing.

## Add

- Viewer discretion warning
- Video title
- Caption
- Source note
- Transcript or summary
- Date/time/context
- Evidence/context box
- Related article link
- Share buttons
- Optional “What this video shows” section
- Optional “What this video does not prove” section

## Why This Matters

A raw video embed can feel sensational.

A framed video module feels journalistic.

It also improves:

- Accessibility
- SEO
- Legal defensibility
- Reader comprehension
- AdSense safety

---

# 7. Beat Landing Pages

Do not rely only on generic Shopify blog/category behavior.

Create dedicated landing/archive pages for major coverage areas.

## Recommended Beat Pages

- Breaking News
- Crime
- Corruption
- Investigations
- Exclusive Video
- Politics
- Local
- National
- Opinion
- About Shadab

## Each Beat Page Should Include

- Beat description
- Latest stories
- Featured story
- Archive links
- SEO title/description
- Internal links to related beats
- Optional newsletter/tip CTA
- Optional “latest updates” rail

## Why This Matters

Dedicated beat pages help with:

- SEO
- Reader navigation
- Internal linking
- Topical authority
- Better archive quality
- Cleaner ad targeting

---

# 8. Locale Copy Cleanup

Clean Shopify language from locale files.

Even hidden Shopify text can appear in:

- Search pages
- Empty states
- Browser metadata
- Accessibility labels
- Error pages
- Theme fallback text
- Cart/account pages if accidentally exposed

## Replace or Remove Wording Like

- shop
- shopping cart
- product
- collection
- checkout
- customer account
- recently viewed products
- add to cart
- quick shop
- product collections

## Use Publication Language Instead

- site
- archive
- story
- article
- investigation
- reader account, if needed
- latest coverage
- newsroom
- report
- topic
- section

## Why This Matters

The language layer should reinforce the site identity.

A serious news site should not accidentally say “shopping cart” or “product collection.”

---

# 9. Publication Performance Budget

A breaking-news site should feel fast.

A heavy storefront payload hurts the experience and makes the site feel less professional.

## Audit and Conditionally Load

- `app.js`
- `app.js.liquid`
- `echarts.min.js`
- `consistent_cart_addon.min.js`
- `jquery.min.js`
- third-party widgets
- cart/storefront scripts
- product/collection scripts
- recently viewed scripts
- quick shop scripts

## Goal

Only load what each template actually needs.

## Suggested Rules

- Homepage loads homepage CSS and only required homepage JS.
- Article pages load article CSS, media embeds, and article-specific JS only.
- Climate dashboard loads ECharts only on climate dashboard templates.
- Cart/product scripts load only if commerce pages remain active.
- Third-party widgets load only where they are useful.
- Video scripts load only on video-heavy articles.

## Why This Matters

Performance affects:

- Reader trust
- SEO
- Mobile experience
- Bounce rate
- Ad performance
- Breaking-news usability

---

# 10. Audit Limitation

This audit is based on repository/theme code.

Shopify admin data may not be fully visible in the repo.

## Not Fully Verified From Repo Alone

- Menu entries
- Page body content
- Blog post content
- Metafield data
- Shopify Admin navigation setup
- Published/unpublished pages
- Blog handles and live article organization

## What This Means

Information architecture and content conclusions should be treated as theme-level findings unless verified inside Shopify Admin.

Before final implementation, verify:

- Main menu
- Footer menu
- Blog handles
- Page content
- Metafields
- Theme settings
- Search setting
- Customer account setting
- Payment/footer settings

---

# 11. Additions to Merge Into the Main Audit

The earlier Markdown audit should be updated with these new sections:

1. Product Framing Problem
2. Homepage Journalism-First Hierarchy
3. Blog Index Upgrade / Pinned Lead Story
4. Reusable Newsroom Components
5. Protected Tip Workflow
6. News Video Module
7. Beat Landing Pages
8. Locale Copy Cleanup
9. Publication Performance Budget
10. Audit Limitation

---

# 12. Updated Priority List

## Priority 1 — Identity Cleanup

- Remove ecommerce signals
- Fix Shopify language
- Make search content-first
- Reframe homepage as journalism-first

## Priority 2 — Article Infrastructure

- Add byline/date/category
- Add featured image/excerpt
- Add NewsArticle schema
- Add viewer discretion support
- Add source/context boxes
- Add correction/update system

## Priority 3 — Newsroom Components

- Developing Story
- Exclusive Video
- What We Know
- What We Don’t Know
- Source Note
- Evidence/Context
- Submit a Tip
- Legal/allegation disclaimer

## Priority 4 — Site Architecture

- Build beat landing pages
- Improve blog archive hierarchy
- Add pinned lead story
- Add latest updates sections
- Add internal linking

## Priority 5 — Trust and Monetization Readiness

- About
- Contact
- Submit a Tip
- Corrections Policy
- Editorial Standards
- Privacy Policy
- Terms
- Advertise/Sponsor

## Priority 6 — Performance and Technical Cleanup

- Remove global ecommerce payload
- Scope scripts and CSS
- Load chart/video/widgets conditionally
- Improve accessibility
- Optimize mobile reading experience

---

# 13. Updated Implementation Prompt

Use this prompt for a coding agent or developer when implementing the Codex additions.

```text
You are working inside the connected GitHub repository for shadabchow-ui/shadab.

This is a Shopify Turbo theme codebase, but the site is not a normal ecommerce store. Shopify is being used as the CMS/theme platform for a personal-brand investigative journalism and breaking-news website.

Brand/site identity:
- Site owner/persona: Shadab Chow
- Purpose: personal brand + independent investigative journalism platform
- Main focus: breaking news, crime reporting, corruption, public accountability, exclusive footage, developing stories, and commentary
- Desired feel: serious, fast, credible, bold, independent, newsroom-style, and personal-brand driven
- Shopify commerce features should be minimized, hidden, disabled, or repurposed unless needed for site operations

Before editing:
- Inspect the actual repository files first.
- Do not guess file names, routes, snippets, sections, templates, or theme behavior.
- Treat the current repo code as the source of truth.
- Shopify Admin data such as menus, page body content, blog posts, and metafields may not be visible in the repo, so avoid unsupported claims about live content.

Primary goal:
Move the theme from a Shopify storefront with blog features into a journalism-first newsroom product powered by Shopify.

Priority 1: Product framing and homepage hierarchy
- Reframe homepage around journalism first.
- Lead with latest/breaking story modules, newsroom mission, credibility strip, and Submit a Tip CTA.
- Move founder/company background lower on the page.
- Add dynamic latest stories from the appropriate blog.
- Add clear sections for crime, corruption, investigations, public accountability, and exclusive video.

Priority 2: Blog/archive hierarchy
- Upgrade blog index from flat grid to newsroom archive.
- Add pinned lead story.
- Add mixed card sizes.
- Add category/beat badges.
- Add excerpts/decks.
- Add author and updated timestamp.
- Add urgency states: Breaking, Developing, Exclusive, Updated, Investigation, Video, Opinion.

Priority 3: Article/newsroom template system
- Rebuild article template as a newsroom article shell.
- Add byline, published date, updated date, beat label, featured image, excerpt/deck, and related stories.
- Add NewsArticle JSON-LD.
- Add breadcrumb navigation and breadcrumb schema.
- Add reusable components for Developing Story, Exclusive Video, Viewer Discretion, Source Note, Evidence/Context, What We Know, What We Don’t Know, Correction/Update, Submit a Tip, and Allegations/Legal Status disclaimer.

Priority 4: Protected tip workflow
- Create or improve Submit a Tip page.
- Add confidentiality language.
- Add anonymous tip guidance.
- Add warning not to submit illegal material.
- Add optional Signal/ProtonMail instructions if appropriate.
- Add clear statement that submissions do not guarantee publication or response.

Priority 5: News video module
- Improve video presentation beyond raw embeds.
- Add viewer discretion warning, caption, source note, transcript/summary, date/time/context, and evidence/context box.
- Make video embeds responsive and accessible.

Priority 6: Beat landing pages
- Create or prepare templates/sections for Breaking News, Crime, Corruption, Investigations, Exclusive Video, Politics, Local, National, Opinion, and About Shadab.
- Each beat page should include a description, latest stories, featured story, archive links, SEO metadata, and internal links.

Priority 7: Shopify language and storefront cleanup
- Clean locale copy so the site stops saying shop, product, product collections, shopping cart, checkout, quick shop, and recently viewed products unless a commerce feature is intentionally used.
- Hide or disable product/cart/collection/customer routes where not needed.
- Remove commerce Open Graph metadata from news pages.
- Make search content-first, not product-first.

Priority 8: Performance budget
- Audit and conditionally load app.js, app.js.liquid, echarts.min.js, consistent_cart_addon.min.js, jquery.min.js, third-party widgets, cart scripts, product scripts, quick shop scripts, and video/chart libraries.
- Load only what each template needs.
- Scope homepage CSS to homepage only.
- Scope climate dashboard and chart scripts only to climate templates.
- Improve mobile reading performance.

Do not redesign the entire site. Make scoped, production-safe changes that move the theme from store-first to journalism-first.
```

---

# Final Take

The Codex audit adds the most value in four areas:

1. **Homepage should be journalism-first, not founder-first**
2. **Blog archive needs a pinned lead story and newsroom hierarchy**
3. **Articles need reusable reporting components**
4. **Tips and video need serious editorial infrastructure**

These additions make the roadmap more product-grade.

The final direction should be:

> Shopify remains the backend/theme platform, but the public experience becomes a serious independent newsroom led by Shadab Chow.
