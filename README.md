# Modern Trading Company (MTC) — website

A plain HTML + CSS website (with one small script). No build tools, no database.
Upload the whole `mtc-site` folder to any web host and it works.

```
mtc-site/
├── index.html  about.html  products.html  brands.html
├── network.html  services.html  news.html  contact.html  404.html
├── css/style.css        ← all design (colours, fonts, layout)
├── js/main.js           ← language switch, menu, search, forms
├── img/logo/            ← original MTC logo (vector SVG, from the master logo file)
│     mtc-logo.svg         full colour (header)
│     mtc-logo-white.svg   white (footer, dark backgrounds)
│     mtc-icon*.svg        icon only — green, gold, white
├── img/favicon.svg      ← browser tab icon (MTC icon)
├── img/og-image.png     ← preview image shown when the site is shared on WhatsApp / social media
├── img/illustrations/   ← drawings used until you add photos
├── img/photos/          ← put your own photos here
├── docs/MTC-Company-Profile.pdf  ← company profile (download buttons link here)
├── robots.txt  sitemap.xml
```

The editable source of the company profile is `../company-profile/profile.html`
(open it in Chrome → Print → Save as PDF, Margins: None, Background graphics: on).

## Done

- [x] Original logo (header, footer, favicon, share image, company profile)
- [x] Company profile PDF (8 pages)
- [x] Working hours: Saturday – Thursday, 6:00 AM – 10:00 PM
- [x] Domain: https://www.foodmoderntrading.com (canonical links, sitemap, robots, share tags)

- [x] Photos on every page from the MTC AI photo pack: one hero photo, 10 category photos, inner pages and news. All AI-upscaled 4x and given one consistent colour grade; scene photos are 3:2, category photos 5:4 (`img/photos/`, `img/photos/categories/`)

- [x] Brand logos: 10 brands on brands.html (two rows, PepsiCo card wider) and 6 on the homepage strip. Files in `img/brands/`. To add one, copy a `.brand-slot` line and change the image.

- [x] Product photos: 47 brand photos in `img/products/` cover 510 products (from Open Food/Beauty/Products Facts, CC BY-SA 3.0, credited on products.html). Which products get which photo is set in `../tools/product-images.json`; run `ruby tools/build-products.rb` after changing it. Products without a brand photo show their category photo.

- [x] Brands page: "A Diverse Portfolio of Leading Brands" with 16 featured logos and a searchable, filterable directory of 155 brands in 7 categories. Everything comes from `js/brands-data.js`: add a brand name to its category list, or add a logo to `featured` (logo file in `img/brands/`). No other changes needed.

## Still to do

- [ ] **Arabic company name**: the site uses "شركة التجارة الحديثة". Find & Replace if your official Arabic name differs.
- [ ] **Branches**: only Jeddah and Makkah are listed (plus a "+9 more" card) on `network.html`, `contact.html` and the profile.
- [ ] **Google Maps links** for each branch (search the files for `google.com/maps`).
- [ ] **LinkedIn**: add the company page URL in the footer (search for `linkedin` — it is commented out in each page).
- [ ] **Real photos**: the site now uses AI concept photos from the MTC photo pack (`img/photos/`). Replace them with real photos of your sites, trucks and team when you have them. Keep the same file names and nothing else needs to change.
- [ ] Ask an Arabic speaker to proofread the Arabic text.

## Products list (1,905 items)

The Products page lists every product from your product master, sorted into the 10 categories.

- The list lives in **`../PRODUCTS-categorised.csv`** (open it in Excel). Columns: code, English name, Arabic name, unit, category.
- To add or remove a product, or move one to another category, edit that file and save it as CSV. Category names must be one of:
  `beverages, confectionery, rice-grains, edible-oils, canned, dairy, spices, household, foodstuffs, frozen`
- Then, in Terminal, from the `amal claude` folder, run: `ruby tools/build-products.rb`
  This rewrites `js/products-data.js`, which the page reads. Upload that file with the rest of the site.
- Each product has an "Ask price" button that opens WhatsApp with the product name and code filled in.

## How the two languages work

Every piece of text is written twice, side by side:

```html
<h2><span lang="en">Our services</span><span lang="ar">خدماتنا</span></h2>
```

The page shows only the selected language. To change any text, edit both versions.
The visitor's choice is remembered. You can link straight to Arabic with `?lang=ar`
(e.g. `https://yourdomain.com/products.html?lang=ar`).

Form placeholders and dropdown options use `data-ar="…"` / `data-ar-placeholder="…"` for the Arabic version.

## Common edits

**Replace an illustration with a photo** — every image spot has a comment like
`<!-- PHOTO SLOT: img/photos/warehouse.jpg -->`. Put your photo in `img/photos/`
and change the `src` of the `<img>` just below it. Use JPGs about 1600 px wide, under 300 KB.

**Add a product** (`products.html`) — copy one whole `<article class="product-card">…</article>`
block, paste it, and change the text. `data-cat` must be one of:
`beverages, confectionery, rice-grains, edible-oils, canned, dairy, spices, household, foodstuffs, frozen`.
Add extra search words (English or Arabic) to `data-keywords`. Search and filters pick it up automatically.
The products listed now are typical product lines — swap in your real lines and brands.

**Add a branch** (`network.html`) — copy a `<div class="branch">…</div>` block. Change the "+9" card number as you add them.

**Add a news post** (`news.html`) — copy an `<article class="news-card">…</article>` block and put the newest first.
Update the three news cards on `index.html` too.

**Add a brand logo** — put the file in `img/brands/` and replace
`<span class="ph">…</span>` inside a `brand-slot` with `<img src="img/brands/name.png" alt="Brand name">`.

**Change phone / WhatsApp / email** — Find & Replace across all `.html` files
(`966547242394`, `+966569302603`, `foodmoderntrading@gmail.com`), and update the two lines at the top of `js/main.js`.

**Colours** — at the top of `css/style.css` (`--green: #187043`, `--green-dark: #0E4D2F`, `--charcoal: #1F2933`).

## Forms

Forms don't need a server. When a visitor presses **Send via WhatsApp** or **Send via email**,
their WhatsApp or email app opens with the message already filled in, addressed to MTC.
They press send. Nothing is stored on the website.

## Publishing

Any static host works. Easiest options:

- **Netlify Drop** — go to app.netlify.com/drop and drag the `mtc-site` folder in. Then connect your domain.
- **cPanel / shared hosting** — upload the contents of `mtc-site` into `public_html`.
- **GitHub Pages** or **Cloudflare Pages** — upload the folder to a repository and enable Pages.

To preview on your computer, just double-click `index.html`.
