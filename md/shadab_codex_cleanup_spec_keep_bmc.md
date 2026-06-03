# Shadab Repo Cleanup Spec for Codex

## Purpose

This document is a scoped cleanup specification for the `shadabchow-ui/shadab` Shopify Turbo theme repository.

The site is **not a normal ecommerce storefront**. Shopify is being used as the CMS/theme platform for a personal-brand investigative journalism and breaking-news website.

## Important Instruction

**Do not remove Buy Me a Coffee.**

Buy Me a Coffee is intentionally used for reader support / donations and should remain active.

All other inactive app remnants, ecommerce baggage, and unnecessary global loads should be reviewed and cleaned safely.

---

# Site Context

## Brand / Platform

- Site owner/persona: Shadab Chow
- Site purpose: independent investigative journalism + breaking-news platform
- Main content: crime reporting, corruption, public accountability, exclusive footage, developing stories, commentary
- Desired feel: serious, fast, credible, independent, newsroom-style, personal-brand driven
- Shopify should function as a CMS/theme engine, not as the public identity of a store

## Active Apps to Preserve

Only these active app/service categories should remain:

1. **Buy Me a Coffee**
   - Keep active
   - Used for reader support / donations
   - Do not delete unless replacing with an equivalent support flow

2. **Brevo**
   - Keep active if used for newsletter/email automation
   - Repo search may not show Brevo because it may be injected through Shopify Admin/app embeds/pixels

3. **PushOwl**
   - Keep active if intentionally used for notifications
   - Repo search may not show PushOwl because it may be injected through Shopify Admin/app embeds/pixels

Everything else should be treated as cleanup candidate unless Codex proves it is still actively required.

---

# Current Issues Found

## 1. SweetTooth / Smile Loyalty Code Is Still Present

The repo contains old SweetTooth loyalty snippets:

- `snippets/sweettooth-initializer.liquid`
- `snippets/sweettooth-tab-widget.liquid`

The theme layout includes these snippets near the bottom of `layout/theme.liquid`:

```liquid
{% include 'sweettooth-initializer' %}
{% include 'sweettooth-tab-widget' %}
```

The initializer references SweetTooth metafields and customer reward data:

```liquid
shop.metafields['sweettooth'].api_secret
shop.metafields['sweettooth'].api_key
customer.id
customer-auth-digest
```

## Why This Should Go

SweetTooth/Smile loyalty is ecommerce rewards infrastructure.

This site is not being positioned as a retail shop.

It adds the wrong store/rewards signal and may create extra DOM/app behavior.

## Codex Task

- Remove SweetTooth includes from `layout/theme.liquid`.
- Delete or no-op the SweetTooth snippets.
- Search for any other `sweettooth`, `Smile`, `rewards`, or loyalty references.
- Remove only if not required by active Shopify Admin apps.
- Confirm Liquid rendering does not break.

---

# 2. Consistent Cart Addon Is Still Injected

`layout/theme.liquid` contains an inline Consistent Cart Addon block:

```liquid
<!-- BeginConsistentCartAddon -->
<script>
  Shopify.merge_cart_text = ...
  Shopify.customer_logged_in = ...
  Shopify.customer_email = ...
  Shopify.log_uuids = true;
</script>
<!-- EndConsistentCartAddon -->
```

## Why This Should Go

This is cart-sync / merge-cart infrastructure.

The public site is a journalism platform, not a shopping cart experience.

It adds ecommerce payload and reinforces the wrong product/store identity.

## Codex Task

- Remove the Consistent Cart Addon inline script from `layout/theme.liquid`.
- Search for `consistent_cart`, `merge_cart`, `merge_cart_text`, and similar strings.
- Remove unused locale entries if they are not referenced after cleanup.
- Confirm no Liquid or JavaScript errors remain.

---

# 3. Buddha Mega Menu App Code Is Present

`layout/theme.liquid` includes:

```liquid
{% include 'buddha-megamenu-before' %}
{% include 'buddha-megamenu' %}
```

The repo contains:

- `snippets/buddha-megamenu.liquid`
- `snippets/buddha-megamenu-before.liquid`
- `snippets/buddha-megamenu-wireframe.liquid`
- `assets/buddha-megamenu.js.liquid`
- likely related CSS/assets

The main snippet injects:

- Font Awesome from MaxCDN
- `buddha-megamenu.css`
- `buddha-megamenu.js`
- product/collection menu data

## Why This Should Go

A journalism site should use a clean editorial navigation structure.

Buddha Mega Menu is app/storefront infrastructure and may add unnecessary CSS/JS, Font Awesome, and product/collection assumptions.

## Codex Task

- Determine whether the live theme actually depends on Buddha Mega Menu.
- If not actively used:
  - Remove the two includes from `layout/theme.liquid`.
  - Delete the Buddha snippets/assets.
  - Remove related CSS/JS references.
- If currently used only for navigation:
  - Replace it with native Turbo/theme navigation or a simpler editorial nav.
- Confirm header navigation still renders correctly after removal.

---

# 4. Buy Me a Coffee Must Stay

`layout/theme.liquid` includes a Buy Me a Coffee widget:

```liquid
<script
  data-name="BMC-Widget"
  data-cfasync="false"
  data-no-instant
  src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
  data-id="shadabchow"
  data-description="Support me on Buy me a coffee!"
  data-message="Show your support &amp; help us spread the truth."
  data-color="#5F7FFF"
  data-position="Right"
  data-x_margin="18"
  data-y_margin="18">
</script>
```

## Required Handling

Do **not** remove this.

## Optional Improvement

If optimizing performance later, Codex may propose one of these alternatives, but should not change it without explicit approval:

1. Keep as-is.
2. Convert to an inline support CTA.
3. Lazy-load the widget after user interaction.
4. Keep the script only on homepage/article pages.

## Codex Task

- Preserve Buy Me a Coffee.
- Do not delete the script in this cleanup pass.
- If making performance changes, leave a comment or TODO instead of removing it.

---

# 5. Climate Dashboard CSS Loads Globally

`layout/theme.liquid` currently loads:

```liquid
{{ 'climate-dashboard.css' | asset_url | stylesheet_tag }}
```

The comment says it is safe to include globally, but the speed audit shows it is render-blocking.

## Why This Should Change

Climate dashboard CSS should not block rendering for normal pages such as:

- homepage
- article pages
- blog pages
- about page
- contact/tip pages

## Codex Task

- Load `climate-dashboard.css` only on the climate dashboard template.
- Use a safe Liquid condition such as:

```liquid
{% if template contains 'climate-dashboard' %}
  {{ 'climate-dashboard.css' | asset_url | stylesheet_tag }}
{% endif %}
```

- Confirm climate dashboard page still works.

---

# 6. ECharts and Climate Dashboard JS Load Globally

`layout/theme.liquid` currently loads:

```liquid
<script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js" defer></script>
<script src="{{ 'climate-dashboard.js' | asset_url }}" defer></script>
```

## Why This Should Change

ECharts is large and should not load on every page.

The PageSpeed report flagged ECharts as a major unused JavaScript payload.

## Codex Task

- Load ECharts only on climate dashboard templates.
- Load `climate-dashboard.js` only on climate dashboard templates.
- Use a condition like:

```liquid
{% if template contains 'climate-dashboard' %}
  <script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js" defer></script>
  <script src="{{ 'climate-dashboard.js' | asset_url }}" defer></script>
{% endif %}
```

- Confirm no climate dashboard functionality breaks.

---

# 7. Product-First Search Still Exists

Header search currently adds a hidden `type=product` input when `settings.search_option != 'everything'`:

```liquid
{% if settings.search_option != 'everything' %}
  <input type="hidden" name="type" value="product" />
{% endif %}
```

Settings currently indicate `search_option` may still be set to `products`.

## Why This Should Change

A news site needs search to find:

- articles
- pages
- investigations
- blog posts
- topic pages

Product-only search is wrong.

## Codex Task

- Change search behavior to content-first.
- Set or default `search_option` to `everything`.
- Remove product-only hidden input from header search if appropriate.
- Review `sections/search-template.liquid` for the same issue.
- Confirm search can find articles/pages.

---

# 8. Cart and Ecommerce Header UI Still Exist

The header still contains:

- mobile cart icon
- desktop cart icon
- AJAX cart dropdown
- checkout form
- cart item list
- quantity controls
- subtotal/savings
- checkout button

## Why This Should Change

This is unnecessary for a journalism-first public site.

It also reinforces ecommerce/store identity.

## Codex Task

- Hide cart UI from the public header.
- Prefer a non-destructive approach first:
  - Respect `section.settings.show_cart`
  - Set default to false
  - Remove rendered dropdown if not needed
- Do not delete core cart templates yet unless explicitly requested.
- Leave `/cart` template intact for safety unless making a full commerce-removal pass.
- Confirm header still renders correctly.

---

# 9. Customer Account and Currency UI Should Be Hidden

The header can show:

- customer login/account links
- currency switcher

## Why This Should Change

Unless building memberships, these are ecommerce/storefront signals.

## Codex Task

- Hide customer account links from public nav unless explicitly needed.
- Hide currency switcher.
- Confirm Shopify customer account routes are not promoted in navigation.
- Do not delete customer templates unless explicitly requested.

---

# 10. Footer Store Signals Should Be Removed

Footer currently supports:

- theme designer credits
- Powered by Shopify
- payment method icons

## Why This Should Change

For an investigative journalism site, these signals reduce credibility.

## Codex Task

- Set defaults to false for:
  - `display_designed_by`
  - `display_payment_methods`
- Remove or hide `powered_by_link`.
- Keep footer copyright.
- Replace with editorial/publication footer links later.

---

# 11. Shopify Locale Copy Needs Cleanup

The locale file likely still contains store language such as:

- shop
- product
- products
- cart
- checkout
- collections
- quick shop
- recently viewed
- add to cart

## Why This Should Change

Even if hidden, this language can surface in:

- search pages
- empty states
- accessibility labels
- browser metadata
- fallback UI
- error states

## Codex Task

- Audit `locales/en.default.json`.
- Do not blindly remove keys that Turbo still references.
- Replace public-facing strings with publication language where safe.
- Examples:
  - “Products” → “Stories” or “Coverage” where appropriate
  - “Collections” → “Archives” or “Topics”
  - “Shop” → “Site”
  - “Cart” → hide/remove from public UI instead of renaming if not used

---

# 12. Do Not Randomly Delete Core Turbo Files

Codex should **not** blindly delete core Turbo theme files.

## Do Not Delete Yet

- `assets/app.js`
- `assets/styles.scss.css`
- `templates/product.liquid`
- `templates/cart.liquid`
- `templates/collection.liquid`
- product snippets
- collection snippets
- cart snippets
- customer templates

## Safer Approach

1. Hide ecommerce UI from public navigation.
2. Disable app remnants and global loads.
3. Make search/news pages content-first.
4. Leave core Shopify routes intact until a dedicated phase.
5. Later, simplify/noindex unused routes if needed.

---

# 13. Shopify Admin Cleanup Required

Some scripts may not appear in Git because Shopify apps inject through:

- `content_for_header`
- theme app embeds
- Shopify pixels
- customer events
- app proxies
- installed app integrations

## Keep Active

- Buy Me a Coffee
- Brevo
- PushOwl

## Review / Remove From Shopify Admin

Codex cannot fully clean these from Git alone. The Shopify Admin should also be checked for:

- old loyalty/rewards apps
- cart sync apps
- mega menu apps
- abandoned pixels
- abandoned app embeds
- abandoned customer events
- storefront apps
- discount/cart apps
- review/product apps
- recently viewed apps
- upsell apps

## Admin Checklist

In Shopify Admin:

1. Go to **Apps**.
2. Remove inactive apps.
3. Go to **Online Store → Themes → Customize → App embeds**.
4. Disable unused app embeds.
5. Go to **Settings → Customer events**.
6. Remove unused pixels/events.
7. Go to **Settings → Checkout / Customer accounts**.
8. Disable unneeded account/checkout features.
9. Re-run PageSpeed after cleanup.

---

# 14. Performance Cleanup Priorities

## Priority 1

- Keep Buy Me a Coffee.
- Remove SweetTooth.
- Remove Consistent Cart.
- Remove Buddha Mega Menu if unused.
- Conditional-load climate dashboard CSS/JS.
- Conditional-load ECharts.

## Priority 2

- Make search content-first.
- Hide cart UI.
- Hide customer account links.
- Hide currency UI.
- Remove payment icons and theme credits.

## Priority 3

- Review Shopify Admin for app embeds/pixels.
- Keep only Brevo and PushOwl if active.
- Remove abandoned app scripts.
- Re-run Lighthouse/PageSpeed.

---

# 15. Expected Results

After this cleanup, the site should have:

- Less unused JavaScript
- Fewer render-blocking resources
- Less ecommerce/storefront baggage
- Cleaner journalism-first public experience
- Better PageSpeed/Lighthouse potential
- Less risk of old app errors
- Better credibility for a news/investigative platform

---

# 16. Codex Implementation Prompt

Use this prompt for Codex:

```text
You are working inside the connected GitHub repository: shadabchow-ui/shadab.

This is a Shopify Turbo theme codebase, but the site is not a normal ecommerce store. Shopify is being used as the CMS/theme platform for a personal-brand investigative journalism and breaking-news website.

Important:
Do not remove Buy Me a Coffee. It is intentionally used for reader support/donations and must stay.

Active services to preserve:
- Buy Me a Coffee
- Brevo, if present through Shopify Admin/app embeds/pixels
- PushOwl, if present through Shopify Admin/app embeds/pixels

Cleanup goal:
Remove inactive app remnants, ecommerce/storefront baggage, and unnecessary global performance payload while preserving core Turbo theme stability.

Before editing:
- Inspect the actual repository files first.
- Do not guess file paths.
- Treat current repo code as source of truth.
- Make scoped, production-safe changes.
- Do not randomly delete core Turbo theme files.
- Do not remove Buy Me a Coffee.

Tasks:
1. Remove SweetTooth/Smile loyalty app remnants:
   - Remove includes from layout/theme.liquid.
   - Delete or no-op snippets/sweettooth-initializer.liquid and snippets/sweettooth-tab-widget.liquid.
   - Search for all sweettooth/rewards references.

2. Remove Consistent Cart Addon remnants:
   - Remove inline ConsistentCart/merge_cart script from layout/theme.liquid.
   - Search for consistent_cart, merge_cart, merge_cart_text.
   - Remove unused locale keys only if safe.

3. Remove Buddha Mega Menu if unused:
   - Inspect layout/theme.liquid includes.
   - Inspect snippets/assets for buddha-megamenu.
   - If not needed, remove includes and delete related snippets/assets.
   - Confirm navigation still renders correctly.
   - If navigation depends on it, replace with native editorial navigation instead of app menu code.

4. Keep Buy Me a Coffee:
   - Preserve BMC widget/script.
   - Do not delete it.
   - If performance optimization is proposed, leave a TODO or make it optional only.

5. Conditional-load climate dashboard assets:
   - Load climate-dashboard.css only on climate dashboard templates.
   - Load climate-dashboard.js only on climate dashboard templates.
   - Load ECharts only on climate dashboard templates.
   - Confirm climate dashboard page still works.

6. Make search content-first:
   - Remove product-only search behavior from header/search templates.
   - Ensure search can find articles/pages.
   - Set default search option to everything if settings data is updated.

7. Hide ecommerce UI:
   - Hide cart icon/dropdown from public header.
   - Hide customer account links unless required for membership.
   - Hide currency switcher.
   - Keep core cart/product templates for now unless specifically requested.

8. Clean footer store signals:
   - Hide/remove payment method icons.
   - Hide/remove theme designer credits.
   - Hide/remove Powered by Shopify.
   - Keep copyright.

9. Review locale language:
   - Replace public-facing store language with publication language where safe.
   - Do not remove locale keys still referenced by Turbo.

10. Validate:
   - Ensure Liquid renders without missing snippet errors.
   - Confirm homepage works.
   - Confirm article/blog/search pages work.
   - Confirm climate dashboard still works.
   - Confirm Buy Me a Coffee still works.
   - Re-run PageSpeed/Lighthouse if possible.

Do not perform a broad redesign. This is a cleanup and performance alignment pass only.
```

---

# 17. Final Note

The safest cleanup path is:

1. Keep Buy Me a Coffee.
2. Remove old inactive app remnants.
3. Stop loading climate/chart assets globally.
4. Hide public ecommerce UI.
5. Clean Shopify Admin app embeds/pixels separately.
6. Preserve core Turbo files until a later dedicated phase.
