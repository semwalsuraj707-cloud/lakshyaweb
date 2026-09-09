# Lakshya — Official Website

Static, dependency-free website for **Lakshya**, an online preparation platform for
competitive and entrance examinations (NDA, CDS, SSC GD).

- Pure HTML + CSS + vanilla JavaScript. No frameworks, no build step, no backend.
- Ready for GitHub Pages and a custom domain.
- Business type: **sole proprietorship** (never described as a company/LLP).
- All business-specific values that were unknown at build time are clearly marked
  placeholders in the form `[INSERT ...]` / `REPLACE-WITH-YOUR-DOMAIN.com`.

---

## 1. File structure

```
index.html            Home
about.html            About Us (+ Business Information)
exams.html            Exams directory (NDA, CDS, SSC GD)
pricing.html          Pricing (Free & Premium)
contact.html          Contact Us (+ form, support/business/payment channels)
privacy-policy.html   Privacy Policy
terms.html            Terms & Conditions
refund-policy.html    Refund & Cancellation Policy
shipping-policy.html  Shipping & Delivery Policy (digital delivery)
faq.html              FAQ
404.html              404 page (used automatically by GitHub Pages)
robots.txt            Search engine rules (edit domain)
sitemap.xml           Sitemap (edit domain)
css/styles.css        All styles
js/main.js            Nav, animations, contact-form mailto fallback
assets/favicon.svg    Favicon
assets/og-image.png   Social share image (1200x630)
assets/apple-touch-icon.png  Home-screen icon
.nojekyll             Disables Jekyll processing on GitHub Pages
footer.tmp.html       Shared footer template (safe to delete after edits)
build_page.py         Optional helper that rebuilt the generated pages
content-*.html        Source content for generated pages (safe to delete after edits)
```

> `footer.tmp.html`, `build_page.py` and `content-*.html` were used to generate
> `terms.html`, `refund-policy.html`, `shipping-policy.html`, `faq.html` and
> `404.html`. Keep them if you want to regenerate; otherwise they can be deleted
> before publishing (the published site does not need them, and they are harmless).

## 2. Placeholders you MUST replace before publishing

Search the whole project for `INSERT` and `REPLACE-WITH-YOUR-DOMAIN` and replace
every occurrence. Placeholder values are highlighted in yellow on the site so
they are easy to spot in the browser too.

| Placeholder | Where | Replace with |
|---|---|---|
| `[INSERT LEGAL BUSINESS NAME]` | about, contact, terms, refund, shipping, footer (all pages) | Your legal/registered business name (sole proprietorship) |
| `[INSERT PROPRIETOR NAME]` | about, contact | Your name as proprietor |
| `[INSERT REAL REGISTERED BUSINESS ADDRESS]` | about, footer (all pages) | Your registered business address |
| `[INSERT REAL REGISTERED ADDRESS]` | contact | Same address (worded for the contact card) |
| `[INSERT REAL OPERATING ADDRESS IF DIFFERENT]` / `[INSERT REAL OPERATING ADDRESS]` | about, contact | Operating address, or repeat the registered address if same |
| `[INSERT OFFICIAL BUSINESS EMAIL]` | about, terms, footer (all pages) | Your official email |
| `[INSERT SUPPORT EMAIL]` | contact, shipping, contact form `data-recipient` | Support email |
| `[INSERT BUSINESS ENQUIRIES EMAIL]` | contact | Business enquiries email |
| `[INSERT PAYMENT SUPPORT EMAIL]` | contact | Payment/refund support email |
| `[INSERT BUSINESS PHONE NUMBER]` | contact, terms, footer (all pages) | Business phone (with country code if desired) |
| `[INSERT REAL BUSINESS HOURS]` | contact | e.g. "Mon–Sat, 10:00 AM – 6:00 PM IST" |
| `[INSERT UDYAM NUMBER ONLY IF YOU WANT TO DISPLAY IT]` | about | Your Udyam number, or delete that row |
| `[INSERT GSTIN IF APPLICABLE]` | about | Your GSTIN, or the text "Not applicable / Not registered" |
| `[INSERT DATE]` | privacy, terms, refund, shipping | Effective date of each policy |
| `[INSERT CURRENT PRICE]` | pricing | Your actual Premium price |
| `[MONTHLY / YEARLY — INSERT ACTUAL BILLING MODEL]` | pricing | Your actual billing model |
| `[INSERT RAZORPAY PAYMENT/SUBSCRIPTION LINK]` | pricing (Get Premium button) | Your Razorpay **payment page / subscription link** (never an API key) |
| `[INSERT ACTUAL REFUND PERIOD/POLICY]` | refund (hero box + section 3) | Your actual refund window/eligibility |
| `[INSERT ACTUAL CANCELLATION RULE]` | refund (hero box + section 2) | Your actual cancellation rule |
| `[INSERT ACTUAL NON-REFUNDABLE CONDITIONS IF ANY]` | refund section 4 | Your non-refundable conditions |
| `[INSERT TIMELINE FOR REFUND PROCESSING]` | refund section 9 | e.g. "within 5–7 working days of approval" |
| `[INSERT ACTIVATION TIME...]` | shipping section 3 | e.g. "immediately" or "within 24 hours" |
| `[INSERT JURISDICTION / CITY]` | terms section 17 | City whose courts have jurisdiction |
| `[INSERT EMAIL]` | privacy contact box | Privacy contact email |
| `[INSERT ADDRESS]` | privacy + refund contact boxes | Business address |
| `https://www.REPLACE-WITH-YOUR-DOMAIN.com` | every page `<head>` (canonical/OG), sitemap.xml, robots.txt | Your official domain |

Also decide:

- **Contact form recipient** — the form's recipient is the `data-recipient`
  attribute on `<form id="contact-form">` in `contact.html`. Until it contains a
  real email, the form politely tells the visitor that email support is not
  configured.
- **OG image** — `assets/og-image.png` is a simple generated brand image; you can
  replace it with a richer 1200x630 PNG of the same filename.

## 3. Security notes (already handled, please keep)

- The site ships with a strict Content-Security-Policy (meta tag in every page):
  no inline scripts, no inline styles, no external origins. If you later add
  Google Fonts, analytics, or a form service, update the CSP in **every** page.
- Never place Razorpay **API keys, secret keys or webhook secrets** anywhere in
  this project. Only a hosted payment page link belongs in `pricing.html`.
- No passwords, tokens or database credentials exist in this codebase — keep it
  that way.
- The site is served over HTTPS automatically by GitHub Pages (enable
  "Enforce HTTPS" in repository settings).

## 4. Run locally

Just open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

then visit http://localhost:8000

## 5. Publish on GitHub Pages

1. Create a GitHub repository (e.g. `lakshya-website`) and push this folder.
2. Repository **Settings → Pages** → Source: *Deploy from a branch* → branch
   `main`, folder `/ (root)` → Save.
3. Wait for the deployment; the site appears at
   `https://<username>.github.io/<repo>/`.
4. `404.html` is used automatically for missing pages.

### Connect your official custom domain

1. In **Settings → Pages → Custom domain**, enter your domain (e.g.
   `www.lakshya.in`) and save. GitHub creates a `CNAME` file for you.
2. At your DNS provider:
   - Apex/root domain (`lakshya.in`): create **A records** to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - `www` subdomain: create a **CNAME record** to
     `<username>.github.io`.
3. Enable **Enforce HTTPS** once the certificate is issued.
4. Finally, replace every `https://www.REPLACE-WITH-YOUR-DOMAIN.com` in the
   HTML `<head>`s, `sitemap.xml` and `robots.txt` with your real domain
   (find-and-replace across the project) and re-deploy.

> Note: `404.html` uses root-absolute asset paths (`/css/...`), which is correct
> for a custom domain or a `username.github.io` user site. If you use a project
> site **without** a custom domain, update those paths to include the repository
> prefix (e.g. `/repo/css/styles.css`).

## 6. Pre-publish checklist

- [ ] Every `[INSERT ...]` placeholder replaced (search the project for "INSERT")
- [ ] Domain replaced in heads, `sitemap.xml`, `robots.txt`
- [ ] Razorpay payment page link added to the "Get Premium" button
- [ ] Real business name, proprietor, address, email, phone and hours on
      About + Contact
- [ ] Policy effective dates set and policies match your actual business model
- [ ] Feature lists (Home "Why Lakshya" / "Learning Features", Pricing) match
      what your platform actually offers today
- [ ] Test the contact form after adding your support email
- [ ] Delete `footer.tmp.html`, `build_page.py`, `content-*.html` if you do not
      need them (optional)
- [ ] HTTPS enforced on GitHub Pages
