PROJECT CONTEXT – Online Shop Catalog System (V1)
Product Identity

We are building a Shopify-lite catalog system for Myanmar social media sellers.

This is NOT a marketplace like Shopee or Amazon.

Primary goal:

Help Online Shop Owners organize products.

Generate clean product links.

Reduce repeated customer questions.

Keep it lightweight and mobile-first.

Use together with Facebook, Telegram, TikTok.

Buyers are secondary; sellers are primary.

Tech Stack

Backend (planned):

Java 21

Spring Boot 3

JPA / Hibernate

PostgreSQL

JWT Authentication

Monolith architecture (no microservices)

Frontend (current demo):

Static HTML

Bootstrap 5

Separate CSS files

Separate JS files

Web-first responsive design

Android WebView planned later

Hosting plan:

EC2 (free tier)

PostgreSQL on same EC2

S3 for images (compressed)

Cloudflare free CDN

Budget constraint:

Under 30,000 MMK per month

Current Demo Website Structure
shop.html
product.html

/css
  layout.css
  shop.css
  product.css

/js
  layout.js
  shop.js
  product.js
  
UI Philosophy
Style:

Clean

Minimal

Professional

Premium but not flashy

Modern Apple-style feel

White background with dark hero header

Rounded UI elements

Subtle shadows

No heavy JS frameworks

Image ratio:

Shop page product images → 3:4 aspect ratio

Product detail main image → 3:4

Thumbnail images → square

Logo → circle (object-fit: cover)

Cards:

Equal height

Flex column layout

Overlay SALE / NEW badges

No layout shift

Shop Page Features (Demo V1)
Global categories (simulated)

Shop-level categories (simulated)

Category filter with count

Sort pill dropdown:

Newest

Price Low → High

Price High → Low

40 demo products

10 products per page

Pagination

URL state preserved:

page

category

sort

Sale ribbon

New badge

Old price with strike-through

Equal height cards

Product Detail Page Features (Demo V1)

Back button (state-preserving)

5-image support (currently demo 3 images)

Thumbnail switching

Large main image

Stock badge

Description

Shared header/footer

No layout shift

Clean spacing

Ready for adding:

Quantity selector

Related products

Copy link

Sticky mobile contact bar

Important Decisions Made

First uploaded image = main image

Up to 5 images allowed per product

Multi-category support future-ready via mapping table

One product → one category in V1 (business logic enforced)

Seller-first system

Not competing with marketplace

No payment integration in V1

Delivery info = simple text (no structured engine yet)

Next Development Goals

We want to:

Improve product detail page

Add related products section

Improve thumbnail interaction

Possibly add sticky mobile contact CTA

Later convert static demo to Thymeleaf templates

Then connect to Spring Boot REST API

Current Focus

We are currently refining the static demo website (shop + product page) to make it:

Stable

Clean

Professional

Production-ready UI

Easily convertible to backend-driven dynamic rendering

Continue improving Product Detail page.