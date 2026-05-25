# Data Model

## Entities

### User
A woman using the platform — the central entity in her economic journey. She discovers skills, learns through courses, sells in the marketplace, and accesses financing.

### Skill
A marketable skill identified through AI-powered discovery. Represents something a user can offer — whether it's a craft, service ability, or expertise.

### Assessment
An AI skill discovery session that helps identify a user's skills through conversation, voice interaction, visual tasks, or dynamic surveys.

### Course
A structured learning program on the eLearning platform covering topics like digital literacy, business skills, communication, and entrepreneurship.

### LiveSession
A bootcamp or guest speaker session where achievers and experts share knowledge, inspire, and teach users in real-time.

### Speaker
An achiever or expert who conducts live sessions and bootcamps, serving as a role model for users on the platform.

### Listing
A product or service offered for sale in the ONDC-connected marketplace. Can be a physical product, local service, or digital service.

### Video
A TikTok-style short video where sellers or influencers showcase, explain, or review a product or service.

### Order
A purchase made through the marketplace, connecting a buyer to a seller's listing with UPI payment integration.

### Loan
A financing request or active loan through OCEN, including micro-loans for inventory, course financing, or business expansion loans.

## Relationships

- User has many Skills (discovered through assessments)
- User has many Assessments (skill discovery sessions)
- User has many Listings (products/services they sell)
- User has many Videos (content they create)
- User has many Orders (as buyer and as seller)
- User has many Loans (financing requests)
- Assessment identifies many Skills
- Course has many LiveSessions
- Speaker hosts many LiveSessions
- Listing has many Videos (showcasing the product/service)
- Listing has many Orders
- Loan belongs to User

## Section-Specific Types

Each section has its own extended type definitions in `product-plan/sections/[section-id]/types.ts`. These cover the full props interfaces for each section's components, including all the data shapes and callback signatures needed for integration.

See:
- `sections/dashboard/types.ts` — DashboardProps, Metrics, Streak, Milestone, Announcement
- `sections/skill-discovery/types.ts` — SkillDiscoveryProps, Skill, SkillCategory, SkillSuggestion
- `sections/elearning/types.ts` — ELearningProps, Course, LiveSession, Badge, Certificate
- `sections/marketplace/types.ts` — MarketplaceSellerProps, Listing, Order, AnalyticsSummary
- `sections/financing/types.ts` — FinancingProps, Loan, LenderOffer, Testimonial
