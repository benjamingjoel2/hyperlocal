# Hyperlocal

Travel and destination inspired merch. A storefront for small-batch tees, hoodies, hats, totes, posters, pins, stickers and mugs, each one designed around a single destination.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run build`     | Production build (also regenerates route types) |
| `npm start`         | Serve the production build                    |
| `npm run lint`      | ESLint                                        |
| `npm run typecheck` | `tsc --noEmit`                                |
| `npm test`          | Vitest unit tests for the catalog and cart    |

Set `NEXT_PUBLIC_SITE_URL` in production so metadata, the sitemap and robots.txt use the real origin.

## What's here

- **Home** (`/`): hero, category strip, featured destinations, featured products.
- **Shop** (`/shop`): the full catalog with category and destination filters and sorting, driven by URL search params so filtered views are shareable.
- **Product** (`/shop/[slug]`): artwork preview that follows the chosen garment color, size and color selection, quantity, add to cart, details, related products. Statically generated for every product.
- **Destinations** (`/destinations`, `/destinations/[slug]`): grouped by region; each destination page carries its own palette and lists its line.
- **Cart** (`/cart`): quantities, removal, subtotal, flat-rate shipping with a free-shipping threshold. Persisted to `localStorage` and synced across tabs.
- **Checkout** (`/checkout`): contact and shipping form with a demo confirmation. No payment provider is connected yet; see below.
- **About** (`/about`), a custom 404, `sitemap.xml` and `robots.txt`.

## Project layout

```
src/
  app/            Routes (App Router)
  components/     UI. Client Components are marked with "use client"; everything else renders on the server.
  lib/
    types.ts        Destination, Product, CartLine and friends
    destinations.ts The destination catalog (palette, motif, copy, coordinates)
    products.ts     The product catalog
    catalog.ts      Lookups, filtering, sorting, related products
    cart.ts         Pure cart reducer, totals, shipping, storage parsing
    cart-store.ts   localStorage-backed external store consumed via useSyncExternalStore
    shop-url.ts     Builds /shop URLs from filter state
    money.ts        Price formatting (prices are stored in US cents)
    __tests__/      Vitest specs
```

## Artwork

There are no image assets. Every destination has a palette and a motif (mountain, skyline, lantern, coast, and so on), and `src/components/product-art.tsx` renders a travel-poster SVG or a round badge from that data. Product cards then frame the art on a garment color, a paper mount, or a neutral background depending on the category. Swapping in real product photography means replacing `ProductArt` with `next/image` and adding an `images` field to `Product`.

## Going live

The catalog is a pair of typed TypeScript arrays, which keeps the storefront fully static. To connect a real backend:

1. Replace the arrays in `src/lib/destinations.ts` and `src/lib/products.ts` with fetches (a CMS, Shopify, Medusa, or a database). The helpers in `catalog.ts` are the only consumers, so the rest of the app doesn't change.
2. Wire a payment provider into `src/components/checkout-form.tsx`. The `onSubmit` handler currently records a demo confirmation client-side and clears the cart.
3. Hook the newsletter form in `src/components/newsletter-form.tsx` to a mailing-list API.
