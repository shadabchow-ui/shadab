# ShadabChow.com Speed Audit — Performance Improvement Plan

## Overview

The site speed is **not terrible**, but it is not clean enough yet for a serious investigative journalism/news platform.

The current Lighthouse score is around **83 Performance**, with the biggest problems coming from:

- Render-blocking CSS
- Duplicate Google Fonts requests
- Unused JavaScript
- ECharts loading globally
- Shopify storefront/cart scripts
- PushOwl and app embed payloads
- Buy Me a Coffee third-party widget
- Oversized tiny images
- Missing image dimensions
- JavaScript console errors
- Accessibility and best-practice issues

The good news: the biggest wins are obvious and fixable.

---

# 1. Current Performance Snapshot

## Mobile

Real-user mobile Core Web Vitals passed in the report.

Reported field data:

- Largest Contentful Paint: 1.7s
- Interaction to Next Paint: 108ms
- Cumulative Layout Shift: 0.04
- First Contentful Paint: 1.4s
- Time to First Byte: 0.4s

Lab data showed:

- Performance: 83
- Accessibility: 88
- Best Practices: 77
- SEO: 100
- First Contentful Paint: 2.7s
- Largest Contentful Paint: 3.8s
- Total Blocking Time: 130ms
- Cumulative Layout Shift: 0
- Speed Index: 2.7s

## Desktop

Real-user desktop Core Web Vitals failed because CLS was too high.

Reported field data:

- Largest Contentful Paint: 1.2s
- Interaction to Next Paint: 66ms
- Cumulative Layout Shift: 0.21
- First Contentful Paint: 1.1s
- Time to First Byte: 0.3s

Lab data showed:

- Performance: 83
- Accessibility: 75
- Best Practices: 73
- SEO: 92
- First Contentful Paint: 0.8s
- Largest Contentful Paint: 1.1s
- Total Blocking Time: 350ms
- Cumulative Layout Shift: 0
- Speed Index: 0.9s

## Main Interpretation

The site is not slow because of server response time.

The server is responding fast.

The bigger problems are:

- Too much frontend payload
- Too many scripts for a news site
- Unnecessary Shopify commerce features
- Render-blocking CSS/fonts
- Third-party app embeds
- Image sizing issues
- JavaScript errors

---

# 2. Biggest Performance Problems

## Problem 1 — ECharts Loads Everywhere

The report shows `echarts.min.js` loading globally.

It is around 326–328 KB transfer size and Lighthouse estimates around 275 KB of unused JavaScript savings.

This is one of the biggest easy wins.

## Why It Is Bad

A news homepage, article page, blog page, About page, or Submit a Tip page should not load a charting library unless the page actually has a chart.

## Fix

Only load ECharts on the climate dashboard template.

```liquid
{% if template contains 'climate-dashboard' %}
  <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js" defer></script>
  {{ 'climate-dashboard.css' | asset_url | stylesheet_tag }}
{% endif %}
```

## Priority

Critical.

This should be one of the first fixes.

---

# 3. Problem 2 — Climate Dashboard CSS Loads Globally

The report shows `climate-dashboard.css` as render-blocking.

It is only about 3 KB, but it still blocks initial render.

## Why It Is Bad

Climate dashboard CSS should not block the homepage, article pages, blog pages, or regular content pages.

## Fix

Only load it on climate dashboard templates.

```liquid
{% if template contains 'climate-dashboard' %}
  {{ 'climate-dashboard.css' | asset_url | stylesheet_tag }}
{% endif %}
```

## Priority

Critical.

This is simple and safe.

---

# 4. Problem 3 — Duplicate Google Fonts Requests

The page currently makes two Google Fonts CSS requests:

```text
/css?family=...
/css2?family=...
```

This creates extra render-blocking network trips.

## Fix Option A — Best Option

Self-host only the font files and weights actually used.

This gives more control and can reduce font-related layout shifts.

## Fix Option B — Good Option

Consolidate into one Google Fonts request.

Example:

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

## Additional Fix

Add `font-display: swap` for the local Turbo icon/font if possible.

Example:

```css
@font-face {
  font-family: 'turbo';
  src: url('{{ "turbo.woff" | asset_url }}') format('woff');
  font-display: swap;
}
```

## Priority

High.

---

# 5. Problem 4 — PushOwl Loads on the Site

PushOwl is showing as a third-party Shopify script.

It is around 56 KB and Lighthouse estimates about 36 KB of unused JavaScript savings.

## Why It Is Bad

For a serious investigative news site, push notifications may be useful later, but right now this is probably adding unnecessary app payload.

It also reinforces the pattern that the site still carries Shopify app/store baggage.

## Fix

In Shopify Admin:

1. Go to Apps.
2. Disable or remove PushOwl if not actively needed.
3. Check app embeds.
4. Disable PushOwl from theme app embeds if it remains installed.
5. Retest Lighthouse.

## Priority

High.

---

# 6. Problem 5 — Buy Me a Coffee Floating Widget Loads Globally

The Buy Me a Coffee widget is not huge, but it adds third-party JavaScript and a fixed animated element.

Lighthouse flags third-party code and non-composited animation issues connected to the fixed widget.

## Why It Is Bad

For a news site, a floating donation widget can feel spammy and distract from reading.

It also adds extra JavaScript to initial page load.

## Better Pattern

Remove the global floating widget.

Replace it with an inline support section:

```text
Support Independent Reporting
Help fund independent investigations, public accountability reporting, and breaking-news coverage.
[Support the work]
```

## Implementation Options

Option 1:

- Use a normal link to Buy Me a Coffee.
- No external script.

Option 2:

- Lazy-load the widget only after the user clicks “Support.”

Option 3:

- Place donation CTA only on homepage, article footer, and About page.

## Priority

High.

---

# 7. Problem 6 — Oversized Tiny Images

Lighthouse found images much larger than their displayed size.

Examples:

- UpCube logo: 1254x1254 displayed at 48x48
- Header/logo image: 410x410 displayed around 105x105
- Estimated savings: about 31 KB

## Why It Is Bad

Small images should not download massive source files.

This is especially important on mobile.

## Fix for 48px Image

```liquid
<img
  src="{{ image | image_url: width: 96 }}"
  srcset="
    {{ image | image_url: width: 48 }} 48w,
    {{ image | image_url: width: 96 }} 96w
  "
  width="48"
  height="48"
  alt="UpCube"
  loading="lazy"
>
```

## Fix for Header Logo

```liquid
<img
  src="{{ logo | image_url: width: 210 }}"
  width="105"
  height="105"
  alt="{{ shop.name | escape }}"
>
```

## Priority

High.

---

# 8. Problem 7 — Missing Explicit Image Dimensions

Lighthouse flags image elements without explicit width and height.

This can cause layout shift.

Desktop field data showed CLS failure at 0.21, so this matters.

## Fix

Every image should include:

- `width`
- `height`
- correct aspect ratio
- responsive source size if needed

Example:

```liquid
<img
  src="{{ article.image | image_url: width: 1200 }}"
  width="1200"
  height="675"
  alt="{{ article.image.alt | escape }}"
  loading="lazy"
>
```

## Priority

High.

This helps stabilize CLS.

---

# 9. Problem 8 — Shopify Storefront and Cart Scripts

The performance report shows Shopify/cart/storefront scripts in the dependency chain.

Examples include:

- cart sync
- storefront scripts
- Shop Pay / shop.app calls
- customer pixels
- app scripts
- Shopify analytics events

## Why It Is Bad

This site is supposed to be a journalism platform, not a public ecommerce store.

These scripts hurt both:

- Speed
- Brand credibility

## Fix

Disable or remove:

- cart icon
- AJAX cart
- quick shop
- currency switcher
- recently viewed products
- product recommendations
- cart sync app
- product scripts on non-product pages
- customer account links unless membership is intentional
- app embeds related to ecommerce

## Priority

Critical.

This aligns with both the speed audit and the journalism-platform audit.

---

# 10. Problem 9 — InstantClick May Be Causing JavaScript Errors

Lighthouse reports console errors:

```text
Cannot use import statement outside a module
Unexpected token '<'
```

This may be caused by InstantClick or Turbo-style AJAX navigation re-evaluating scripts incorrectly.

The earlier code audit also flagged InstantClick as risky because it can re-run scripts after navigation.

## Fix

Temporarily disable InstantClick and retest.

If the console error disappears, remove InstantClick permanently.

## Why

Modern browsers and Shopify CDN are fast enough.

A broken script re-evaluation system is worse than a small prefetch benefit.

## Priority

High.

---

# 11. Problem 10 — Synchronous XHR in app.js

Best Practices shows a deprecated API warning:

```text
Synchronous XMLHttpRequest on the main thread is deprecated.
```

This comes from `app.js`.

## Why It Is Bad

Synchronous XHR can block the main thread and hurt interactivity.

## Fix

This may be part of the Turbo theme JavaScript.

Recommended approach:

1. Identify whether the sync XHR is tied to InstantClick, cart, quick shop, or theme script loading.
2. Disable InstantClick first.
3. Disable unused cart/product scripts.
4. Retest.
5. Avoid editing minified vendor code unless necessary.

## Priority

Medium to High.

---

# 12. Problem 11 — Render-Blocking CSS

Lighthouse flags these render-blocking files:

- `styles.scss.css`
- `sha-homepage.css`
- `climate-dashboard.css`
- Google Fonts CSS

## Fix Strategy

Do not try to fully rewrite Turbo’s main stylesheet first.

Instead:

1. Remove climate CSS from normal pages.
2. Keep homepage CSS only on homepage.
3. Inline small above-the-fold critical CSS for the hero if needed.
4. Consolidate fonts.
5. Later, split article/homepage/blog CSS into smaller scoped files.

## Priority

Medium.

The biggest immediate wins are script and app cleanup, not purging all Turbo CSS.

---

# 13. Problem 12 — Unused CSS in Turbo Stylesheet

Lighthouse reports about 22–23 KB of unused CSS from `styles.scss.css`.

This is normal for a large Shopify theme.

## Recommendation

Do not make this your first optimization.

Turbo’s stylesheet contains many theme features. Removing too aggressively can break the theme.

## Later Fix

After the journalism conversion is stable:

- Remove unused product/grid/cart styles if commerce is disabled.
- Split editorial styles from store styles.
- Keep only needed layout/header/footer/article/blog CSS.
- Create a smaller `editorial.css`.

## Priority

Low to Medium.

---

# 14. Problem 13 — Unused JavaScript

Lighthouse reports about 380–382 KB of unused JavaScript savings.

Largest areas:

- ECharts
- `app.js`
- Shopify WPM/customer pixel script
- PushOwl

## Fix Order

1. Remove ECharts globally.
2. Remove/disable PushOwl.
3. Disable cart/storefront app scripts.
4. Remove Buy Me a Coffee widget from global layout.
5. Disable InstantClick if causing script errors.
6. Retest.
7. Only then consider deeper theme JS cleanup.

## Priority

Critical.

---

# 15. Problem 14 — Accessibility Issues Affect Performance Perception

Accessibility scores were 75–88 depending on the report.

Issues include:

- Low contrast text
- Heading order problems
- Missing main landmark
- Improper list structure
- Some navigation/list issues
- Potential keyboard/ARIA issues

## Fix

Add a proper main landmark:

```liquid
<main id="MainContent" role="main">
  {{ content_for_layout }}
</main>
```

Add a skip link:

```html
<a class="skip-link" href="#MainContent">Skip to content</a>
```

Fix heading order:

- One `h1`
- Major sections as `h2`
- Subsections as `h3`
- Avoid jumping from `h2` to `h6`

Fix lists:

- Ensure every `li` sits inside a `ul`, `ol`, or `menu`.

Improve contrast:

- Increase contrast for gray metadata, labels, and nav text.
- Avoid tiny 9px text for important metadata.

## Priority

Medium.

Accessibility does not directly fix Lighthouse speed, but it improves overall quality and helps the site feel professional.

---

# 16. Problem 15 — Console Errors Hurt Best Practices

Lighthouse reports Best Practices around 73–77.

Main causes:

- Console errors
- deprecated synchronous XHR
- CSP/shop.app issue
- blocked Shopify metrics/logs
- PerfKit initialization error
- script parsing errors

## Fix Order

1. Disable InstantClick and retest.
2. Remove Shopify ecommerce app embeds.
3. Disable unused pixels/events.
4. Remove Shop Pay/cart features if not using ecommerce.
5. Check theme layout around custom scripts.
6. Validate no script tag is injecting module code as classic script.
7. Retest Best Practices.

## Priority

High.

---

# 17. Priority Roadmap

## Phase 1 — Biggest Immediate Wins

Do these first:

1. Conditionally load ECharts only on climate dashboard pages.
2. Conditionally load `climate-dashboard.css` only on climate pages.
3. Disable PushOwl if not actively needed.
4. Remove global Buy Me a Coffee floating widget.
5. Fix tiny oversized images.
6. Add explicit image width and height.
7. Disable InstantClick and retest console errors.
8. Disable unused cart/storefront features.

Expected impact:

- Lower JS payload
- Faster render path
- Better Best Practices score
- Better CLS
- Better brand alignment

---

## Phase 2 — Render Path Cleanup

1. Consolidate Google Fonts into one request.
2. Add `font-display: swap`.
3. Scope `sha-homepage.css` to homepage only.
4. Keep climate/dashboard assets off normal pages.
5. Inline minimal hero critical CSS if needed.
6. Keep noncritical CSS deferred where safe.

Expected impact:

- Better FCP
- Better LCP
- Less render-blocking time

---

## Phase 3 — Shopify Payload Cleanup

1. Remove cart sync if not needed.
2. Disable quick shop.
3. Disable recently viewed products.
4. Disable product recommendations.
5. Disable currency switching.
6. Disable customer account links unless membership is planned.
7. Remove ecommerce app embeds.
8. Clean up product/cart templates if they remain crawlable.

Expected impact:

- Smaller JS dependency chain
- Less third-party load
- Better news-site identity

---

## Phase 4 — Accessibility and Best Practices

1. Add `<main>` landmark.
2. Add skip-to-content link.
3. Fix heading order.
4. Fix invalid list structure.
5. Improve contrast.
6. Fix console errors.
7. Remove deprecated script behavior where possible.
8. Review CSP/HSTS/COOP later.

Expected impact:

- Higher Accessibility score
- Higher Best Practices score
- More professional user experience

---

## Phase 5 — Advanced Optimization

Only do this after the main conversion is stable.

1. Create a smaller editorial CSS bundle.
2. Remove unused Turbo ecommerce CSS.
3. Split article/blog/homepage CSS.
4. Lazy-load below-the-fold media.
5. Create responsive image snippets.
6. Audit app.js functions and remove unused ecommerce modules if safe.
7. Consider replacing old theme JS patterns with lighter custom scripts.

Expected impact:

- Cleaner architecture
- Better maintainability
- Potential 90+ Performance score

---

# 18. Top 10 Fixes

If only 10 fixes are done, do these:

1. Remove global ECharts.
2. Remove global climate dashboard CSS.
3. Disable PushOwl if unused.
4. Remove global Buy Me a Coffee widget.
5. Fix oversized logo/image assets.
6. Add explicit image dimensions everywhere.
7. Consolidate Google Fonts.
8. Disable InstantClick and retest JavaScript errors.
9. Remove unused cart/storefront scripts.
10. Add main landmark and fix heading/list accessibility issues.

---

# 19. What Not to Obsess Over Yet

Do not make unused Turbo CSS the first priority.

Yes, Lighthouse reports unused CSS, but Turbo is a large Shopify theme. Removing CSS too aggressively can break pages.

Focus first on:

- ECharts
- app embeds
- third-party scripts
- images
- fonts
- console errors
- cart/storefront baggage

That is the practical path from the current score toward 90+.

---

# 20. Implementation Prompt

Use this prompt with an AI coding agent or developer.

```text
You are working inside the connected GitHub repository for shadabchow-ui/shadab.

This is a Shopify Turbo theme codebase being used as the CMS/theme platform for a personal-brand investigative journalism and breaking-news website. It is not a normal ecommerce store.

Goal:
Improve performance, Core Web Vitals, accessibility, and best-practice scores while also removing unnecessary ecommerce/storefront payload from the public news experience.

Before editing:
- Inspect the actual repository files first.
- Do not guess file names, routes, snippets, sections, templates, or theme behavior.
- Treat the current repo code as the source of truth.
- Make scoped, production-safe changes.
- Do not redesign the site.

Primary performance findings from Lighthouse:
- Performance is around 83.
- Mobile field Core Web Vitals pass, but desktop field Core Web Vitals fail due to CLS around 0.21.
- ECharts loads globally and contributes around 326–328 KB transfer with large unused JavaScript savings.
- climate-dashboard.css loads globally and is render-blocking.
- There are two Google Fonts CSS requests.
- PushOwl adds third-party JS payload.
- Buy Me a Coffee floating widget loads globally.
- Several small displayed images use oversized source files.
- Some image elements lack explicit width/height.
- Shopify/cart/storefront scripts are present despite the site being journalism-first.
- InstantClick may be causing script re-evaluation errors.
- Best Practices is reduced by console errors and synchronous XHR.
- Accessibility issues include missing main landmark, heading order, contrast, and invalid list structure.

Priority 1:
Conditionally load ECharts and climate dashboard assets only on climate dashboard templates.

Priority 2:
Remove or lazy-load unnecessary third-party widgets:
- PushOwl if unused
- Buy Me a Coffee floating widget
- Shopify storefront/cart/app embeds that are not needed

Priority 3:
Fix images:
- Serve appropriately sized logo/images using Shopify image_url width parameters.
- Add explicit width and height to all important images.
- Use responsive srcset where useful.
- Preserve correct aspect ratios.

Priority 4:
Clean render-blocking assets:
- Consolidate Google Fonts into one request or self-host needed fonts.
- Add font-display: swap where possible.
- Scope sha-homepage.css to homepage only.
- Keep non-page-specific CSS off unrelated templates.

Priority 5:
Reduce storefront baggage:
- Disable cart sync, quick shop, recently viewed products, product recommendations, currency switching, and account links unless intentionally used.
- Remove ecommerce scripts from non-commerce pages where safe.

Priority 6:
Fix JavaScript errors:
- Temporarily disable InstantClick and retest.
- If console errors disappear, remove InstantClick permanently.
- Investigate “Cannot use import statement outside a module” and “Unexpected token '<'.”
- Avoid synchronous XHR where possible.

Priority 7:
Improve accessibility and best practices:
- Wrap content_for_layout in a main landmark.
- Add skip-to-content link.
- Fix heading order.
- Fix invalid list structure.
- Improve text contrast.
- Add or verify accessible labels for interactive controls.

Expected outcome:
- Better Lighthouse performance
- Lower unused JS
- Reduced render-blocking requests
- Improved CLS
- Better Best Practices score
- Cleaner journalism-first public experience
```

---

# 21. Final Take

The speed issue is not mainly the custom homepage CSS.

The bigger issue is:

> Shopify storefront baggage + unnecessary third-party/app scripts + chart library loading everywhere.

Fix those first.

That will make the site:

- Faster
- Cleaner
- More credible
- More aligned with the investigative journalism brand
- Easier to optimize further later
