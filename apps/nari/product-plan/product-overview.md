# Shakti — Product Overview

## Summary

Shakti is a secure, AI-powered economic empowerment platform for women across India, available on web and mobile. It guides women through a complete journey — from discovering their hidden skills through AI and surveys, to learning via courses and live bootcamps with achievers, to earning income through an integrated marketplace and short-video commerce — all connected to India's digital infrastructure (ONDC, OCEN, UPI) with potential state and central government backing.

## Problems & Solutions

**Problem 1: Women don't recognize their marketable skills**
AI-powered skill discovery using conversation, voice (in local languages), visual assessments, and dynamic surveys helps women identify what they can offer and understand their true economic potential.

**Problem 2: No access to markets or customers**
ONDC-connected marketplace plus TikTok-style short video commerce lets women showcase, explain, and sell products and services to a nationwide audience without needing technical expertise.

**Problem 3: Lack of skills and inspiration**
eLearning platform offers courses in digital literacy, business skills, communication, and entrepreneurship, plus live bootcamps and sessions from guest speakers and achievers who serve as role models.

**Problem 4: No access to capital**
OCEN integration provides micro-loans for inventory, course financing for learning, and business expansion loans — all based on the user's stage in their economic journey.

**Problem 5: Complex technology barriers**
Intuitive UI/UX powered by Generative UI adapts dynamically to each user's needs, literacy level, and language preference, making the platform accessible to all segments.

## Key Features

- AI skill discovery (hybrid: conversational, voice-first, visual assessments)
- Multi-language support (rural-first, local language focus)
- Web + Mobile apps with intuitive, adaptive UI/UX
- Generative UI for dynamic interfaces and surveys
- ONDC-connected marketplace for products and services
- Short-video commerce (TikTok-style product showcases and reviews)
- eLearning platform with structured courses
- Live sessions and bootcamps with guest speakers and achievers
- OCEN-powered financing options
- UPI payment integration
- Enterprise-grade security
- Government integration ready (state and central)

## Planned Sections

1. **Dashboard** — The default landing view after login, providing an overview of the user's journey including skill summary, learning progress, marketplace activity, and financing status.
2. **Skill Discovery** — AI-powered journey to help women identify and understand their marketable skills through conversation, voice (in local languages), visual assessments, and dynamic surveys.
3. **eLearning** — Courses, live bootcamps, and sessions with guest speakers and achievers to build digital literacy, business, communication, and entrepreneurial skills.
4. **Marketplace** — ONDC-connected platform with TikTok-style video commerce where women can list, showcase, and sell physical products, local services, or digital services to a nationwide audience.
5. **Financing** — OCEN-powered financing hub providing micro-loans for inventory, course financing for learning, and business expansion loans with seamless UPI payment integration.

## Data Model

Core entities: **User**, **Skill**, **Assessment**, **Course**, **LiveSession**, **Speaker**, **Listing**, **Video**, **Order**, **Loan**

See `data-model/README.md` for full entity relationships.

## Design System

**Colors:**
- Primary: rose
- Secondary: amber
- Neutral: stone

**Typography:**
- Heading: Poppins
- Body: Poppins
- Mono: IBM Plex Mono

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, and application shell
2. **Dashboard** — User command center with metrics, onboarding checklist, and AI agent summaries
3. **Skill Discovery** — Skill cards, validation wizard, AI conversation, and category browser
4. **eLearning** — Personalized learning feed, course cards, live event banners, and badge display
5. **Marketplace** — Seller analytics dashboard with revenue charts, AI insights, and order management
6. **Financing** — OCEN loan hub with EMI tracking, credit ladder, and trust signals

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
