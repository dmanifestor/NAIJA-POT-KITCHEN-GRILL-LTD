# NAIJA POT KITCHEN & GRILL LTD — Website Documentation

A responsive, production-ready restaurant web application built for **NAIJA POT KITCHEN & GRILL LTD**, celebrating authentic Nigerian cuisine, traditional wood-fire and cast-iron pot cooking, and modern hospitality.

---

## 1. Brand Identity & Visual Specifications

### 1.1 Brand Color Palette
- **Burgundy**: `#6D1F2B` — Primary accent, action buttons, category highlights.
- **Gold**: `#C6A15B` (with `#E5C578` highlights & `#9E7B35` deep shades) — Metallic crest, borders, and emblems.
- **Ivory**: `#FFF7E8` — Primary headings, high-contrast readable text, light-mode surfaces.
- **Charcoal**: `#292522` / Rich Obsidian `#141211` — Canvas and deep restaurant backdrop.
- **Terracotta**: `#C65D3B` — Live flame, grill embers, and spice energy.

### 1.2 Typography System
- **Display & Headings**: `Playfair Display` (Serif) — Editorial luxury, warmth, and prestige.
- **Body & UI**: `Plus Jakarta Sans` / `Inter` (Sans-Serif) — Modern legibility across mobile devices.
- **Numerals & Metrics**: `Tabular Figures` (`font-mono tabular-nums`) for clean financial alignment.

### 1.3 Logo Deliverables (Section 3.2)
The application includes an SVG component (`BrandLogo.tsx`) and an exportable Brand Asset Hub with all 6 required variants:
1. **Primary Horizontal Logo** — Header and signage lockup.
2. **Compact Square Emblem** — Circular seal for packaging, stamps, and uniforms.
3. **Light-Background Version** — Inverted palette for receipts and light print media.
4. **Dark-Background Version** — Luxury dark styling for digital menus and screens.
5. **Favicon / App Icon** — Scaled for browser tabs and mobile bookmarks.
6. **Social Profile Version** — Circular avatar for Instagram, WhatsApp, and TikTok.

---

## 2. Content Classification & Client Input Status

Per **Section 2** of the build specification, content is strictly classified:

### 2.1 Confirmed & Verified Content
- **Business Name**: NAIJA POT KITCHEN & GRILL LTD
- **Business Type**: Nigerian Restaurant & Grill
- **Brand Positioning**: Authentic Nigerian cuisine, traditional flavours, and modern hospitality
- **Brand Colours**: Burgundy (`#6D1F2B`), Gold (`#C6A15B`), Ivory (`#FFF7E8`), Charcoal (`#292522`), Terracotta (`#C65D3B`)
- **Ordering Channel**: WhatsApp Click-to-Chat

### 2.2 Placeholders Requiring Client Confirmation
The following are implemented with clear placeholder markings in configuration (`src/data/restaurantConfig.ts`) and can be updated directly via the **Client Setup & Verification Hub**:
- **WhatsApp Telephone Number**: Defaulted to `+447000000000` test format. (Awaiting verified number).
- **Physical Address**: Draft placeholder `[Pending Client Confirmation]`.
- **Opening Hours**: Draft 7-day schedule (client to approve).
- **Menu Pricing & Specific Dishes**: Authentic curated dishes with draft prices; editable in config.
- **Testimonials & Awards**: Omitted from claims until substantiated.
- **Live Google Map**: Guarded to display only when verified address is supplied (Section 4.5).

---

## 3. WhatsApp Ordering Implementation

WhatsApp click-to-chat ordering follows **Section 5** specifications:
- **Number format**: International digits only (`https://wa.me/44XXXXXXXXXX?...`).
- **Interactive Order Tray**: Customers can add dishes, adjust quantities, select order type (*Takeaway*, *Home Delivery*, or *Dine-in Table*), and add spice or dietary notes.
- **Confirmation Step Modal**: Displays an exact preview of the generated URL-encoded message before opening WhatsApp.
- **Regulatory / Payment Disclaimer**: Clearly states that WhatsApp message preparation does not constitute backend payment or fulfillment until confirmed with the restaurant team.

---

## 4. Technical Architecture & Implementation Decisions

- **Framework**: React 19 + TypeScript on Vite.
- **Animation Engine**: `framer-motion` for fluid, staggered fade-in-up entrance animations on menu categories, menu items, why-choose-us pillars, and gallery grid items.
- **Performance**: GPU-accelerated transforms (`transform-gpu`, `will-change-[transform,opacity]`) with zero lagging or dropped frames on mobile and desktop.
- **Styling**: Tailwind CSS v4 with brand variables.
- **Icons**: Lucide React.
- **SEO & Social Metadata**: Pre-configured OpenGraph tags, Twitter cards, and Schema.org `Restaurant` JSON-LD structured data in `index.html`.
- **Performance**: High-fidelity imagery served as local assets with lazy-loading and aspect-ratio preservation.
- **Viewports Tested**: Mobile-first across 320px, 375px, 768px, 1024px, and 1440px.

---

## 5. Development & Deployment

### Run locally:
```bash
npm install
npm run dev
```

### Production Build:
```bash
npm run build
```
The compiled output is located in `dist/`.

### GitHub Pages Deployment:
The application is pre-configured for GitHub Pages:
- **Base Path**: Configured as `base: './'` in `vite.config.ts` so all scripts, styles, and images resolve seamlessly whether hosted at root or on a GitHub repository subpath (e.g. `https://<username>.github.io/<repo>/`).
- **Asset Bundling**: All dish and brand images are imported and bundled into `dist/assets/`, with duplicate fallbacks in `public/`.
- **SPA Routing**: `public/404.html` redirects any direct deep link requests cleanly.
- **Jekyll Bypass**: `public/.nojekyll` prevents GitHub Pages from ignoring bundled assets.
- **Automated Workflow**: `.github/workflows/deploy.yml` runs automated linting and building on push/PR to `main`.

