# Marketplace E-Commerce Site Instructions

## 1. Overview
This document outlines the requirements and architecture for building the Next.js based e-commerce site for the `@apps/marketplace` project. The site aims to provide a modern, seamless, and highly intelligent shopping experience utilizing the latest AI capabilities.

## 2. Core E-Commerce Features
- **Product Catalog:** High-performance product listing page (PLP) and product detail page (PDP) with optimized image loading and server-side rendering (SSR) / static site generation (SSG).
- **Shopping Cart & Checkout:** Persistent shopping cart, guest and authenticated checkout flows, integrating secure payment gateways.
- **User Accounts:** Order history, saved addresses, wishlists, and profile management.
- **Inventory & Pricing:** Real-time stock availability, dynamic pricing, and promotional discount support.

## 3. Advanced Search & Discovery
- **Faceted Filtering & Sorting:** Dynamic sidebar filters (price, category, rating, brand, attributes) with instant URL state updates without full page reloads.
- **Semantic Search:** Replace traditional keyword-based search with vector-based semantic search to understand user intent (e.g., "red dress for summer wedding").
- **Visual Search:** Allow users to upload images to find visually similar products using AI vision models.

## 4. AI & Voice Enabled Search
- **Voice Search Interface:** Integrate Web Speech API or custom speech-to-text models to allow users to search via voice commands seamlessly on both mobile and desktop.
- **Conversational Discovery:** Chat-like interface where an AI assistant helps users narrow down choices by asking clarifying questions based on their initial query.
- **Personalized AI Recommendations:** Display product recommendations tailored to the user's browsing and purchase history, powered by machine learning algorithms.

## 5. Agentic AI Ordering (Autonomous Shopping)
- **AI Shopping Assistant:** An intelligent agent that can autonomously manage a user's shopping list.
- **Automated Replenishment:** Predictive ordering for recurring items (e.g., groceries, essentials). The agent notifies the user and can auto-checkout based on user preferences.
- **Multi-step Goal Execution:** Users can give complex prompts like "Buy a complete camping gear set under $500". The agent will curate the list, present it for approval, and execute the checkout flow.
- **Order Management Agent:** AI agent capable of handling returns, tracking status, and answering customer support queries regarding their specific orders.

## 6. Technical Stack & Implementation Guidelines
- **Framework:** Next.js (App Router), React 19.
- **Styling:** Tailwind CSS (v4), DaisyUI, and custom UI components from `@shakthi/ui`.
- **Database & Backend:** Firebase Data Connect (PostgreSQL) or Cloud Firestore for scalable product and user data.
- **AI Integration:** Google Genkit / Firebase AI Logic for building the agentic workflows, semantic search, and conversational interactions.
- **State Management:** React Server Components (RSC) along with Context API for client-side state like the shopping cart.

## 7. Next Steps
1. Define the Data Connect schema for Products, Orders, and Users.
2. Setup the base layout, navigation, and footer components.
3. Implement the Semantic Search and Vector Database indexing for products.
4. Integrate the Genkit AI flows for the Agentic Ordering features.
