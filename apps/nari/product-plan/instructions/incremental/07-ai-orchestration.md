# Milestone 7: AI Orchestration

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-6 complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend AI orchestration services
- Secure LLM provider integration
- Tool/action execution across existing sections
- Consent, audit logs, and human confirmation gates
- Data fetching, retrieval, and state management for AI context
- Business logic, validation, error handling, and fallback behavior

**Important guidelines:**
- **DO NOT** redesign or restyle the provided section components — use them as-is
- **DO** wire AI outputs into the existing dashboard, skill discovery, marketplace, learning, and financing flows
- **DO** keep AI-generated actions confirmable before they affect money, credit, listings, orders, or user identity
- **DO** store prompts, model responses, tool calls, and user decisions in an audit log
- **DO** support the user's preferred language and literacy level
- **DO** implement graceful fallbacks when the AI provider is unavailable
- **DO** use test-driven development — write tests first for orchestration, safety, and action flows

---

## Goal

Implement the AI orchestration layer that connects Shakti's existing AI-powered surfaces into one secure, multilingual, action-capable assistant.

## Overview

The AI orchestration layer is a backend-first milestone. It powers skill discovery conversations, marketplace recommendations, learning guidance, dashboard agent activity, and financing nudges through a shared service instead of isolated one-off prompts.

The assistant should understand the user's current journey, retrieve relevant platform data, recommend next steps, and execute approved actions through existing APIs. It must be safe for a financial and commerce product: high-impact actions require explicit confirmation, every action is auditable, and the user always sees plain-language explanations.

**Key Functionality:**
- Shared AI session service for chat, recommendations, and agent actions
- Tool router for existing platform actions: add skill, enroll course, draft listing, generate listing copy, suggest financing step, create dashboard recommendation
- Retrieval of user context from dashboard, skills, learning, marketplace, and financing data
- Multilingual prompts and responses based on `user.preferredLanguage`
- Consent and confirmation gates before state-changing actions
- AI action audit trail visible through Dashboard `agentActions`
- Recommendation generation visible through Dashboard `recommendations` and Marketplace `aiInsights`
- Safe fallback responses when AI is offline, uncertain, or missing required consent
- Rate limits, abuse protection, PII minimization, and prompt-injection defenses

## Recommended Approach: Test-Driven Development

Create focused tests for:
- AI session creation and message history
- Skill discovery conversation output mapped to skill suggestions
- Tool calls requiring confirmation before execution
- Marketplace insight generation from analytics data
- Dashboard agent action and recommendation creation
- Language handling for supported Indian languages
- Provider failure fallback behavior
- Audit log persistence for prompts, responses, tool calls, and confirmations
- Authorization boundaries: users cannot access another user's AI context or actions

**TDD Workflow:**
1. Write failing tests for the orchestration service and action confirmation flow
2. Implement provider abstraction and deterministic mock provider for tests
3. Implement retrieval/context builders for each section
4. Add tool execution one action at a time, starting with low-risk actions
5. Add audit logs, safety gates, and fallback behavior
6. Refactor while keeping tests green

## What to Implement

### AI Provider Abstraction

Create a provider interface so the app is not hard-coded to one model vendor.

The abstraction should support:
- Chat completion with system, developer, and user messages
- Structured JSON output for skill suggestions, recommendations, and tool calls
- Streaming responses where the app has a chat UI
- Timeout and retry controls
- Provider-level safety errors
- A deterministic mock provider for automated tests

Suggested environment variables:

```
AI_PROVIDER=openai
AI_MODEL=<model-name>
AI_API_KEY=<secret>
AI_TIMEOUT_MS=30000
AI_MAX_DAILY_ACTIONS_PER_USER=50
```

Keep API keys server-side only. Never expose model credentials to the browser.

### Data Model

Add persistent tables or collections for:

- `ai_sessions` — Conversation or task session metadata
- `ai_messages` — User, assistant, system, and tool messages
- `ai_tool_calls` — Proposed and executed tool calls
- `ai_action_audits` — Durable audit log for AI-suggested and AI-executed actions
- `ai_user_preferences` — Optional AI-specific language, explanation depth, and consent preferences

Minimum fields:

```
ai_sessions:
  id, userId, purpose, status, language, createdAt, updatedAt

ai_messages:
  id, sessionId, role, content, metadata, createdAt

ai_tool_calls:
  id, sessionId, toolName, arguments, status, requiresConfirmation,
  confirmedAt, executedAt, result, error, createdAt

ai_action_audits:
  id, userId, sessionId, actionType, targetSection, summary,
  beforeState, afterState, riskLevel, status, createdAt
```

### API Endpoints to Build

```
POST /api/ai/sessions                 → Start an AI session
GET  /api/ai/sessions/:id             → Get session + messages
POST /api/ai/sessions/:id/messages    → Send user message and get assistant response
POST /api/ai/tool-calls/:id/confirm   → Confirm and execute pending tool call
POST /api/ai/tool-calls/:id/cancel    → Cancel pending tool call
GET  /api/ai/actions                  → Recent AI action audit feed for Dashboard
GET  /api/ai/recommendations          → Personalized recommendations for Dashboard
POST /api/ai/skill-discovery          → Run structured skill discovery turn
POST /api/ai/marketplace/insights     → Generate seller insights from analytics
POST /api/ai/listings/draft           → Draft listing title/description/tags
POST /api/ai/learning/coach           → Recommend course or next lesson
POST /api/ai/financing/coach          → Explain financing options and next step
```

### Tool Router

Implement a server-side tool router that maps approved AI tool calls to existing app operations.

| Tool | Risk | Confirmation Required | Action |
|------|------|-----------------------|--------|
| `suggest_skill` | Low | No | Return skill suggestion without saving |
| `add_skill` | Medium | Yes | Add skill to user's profile |
| `recommend_course` | Low | No | Return course recommendation |
| `enroll_course` | Medium | Yes | Enroll user in a course |
| `draft_listing` | Low | No | Generate listing draft text |
| `publish_listing` | High | Yes | Publish or update a marketplace listing |
| `create_marketplace_insight` | Low | No | Add seller insight/recommendation |
| `suggest_loan_type` | Low | No | Explain relevant financing option |
| `start_loan_application` | High | Yes | Start loan application flow only, no final submission |
| `create_dashboard_recommendation` | Low | No | Add recommendation to Dashboard |

Do not allow AI to directly submit loan applications, accept lender offers, make payments, change UPI mandates, delete listings, refund orders, or change user KYC data. These must remain user-driven flows.

### Context Builder

Build a context layer that gathers only the data needed for the current AI task.

Use:
- User profile: name, city, preferred language, onboarding state
- Skills: claimed skills, validation status, proficiency, earning potential
- Learning: active courses, completion progress, badges, upcoming live sessions
- Marketplace: seller profile, active listings, analytics, recent orders, low stock
- Financing: KYC status, eligibility state, active loans, repayment status
- Dashboard: onboarding steps, metrics, recent agent actions, recommendations

Avoid sending unnecessary PII, raw payment details, full identity documents, UPI handles, access tokens, or sensitive financial account data to the model.

### Prompting Requirements

Prompts should instruct the assistant to:
- Respond in the user's preferred language unless the user asks otherwise
- Use simple explanations suitable for first-time digital entrepreneurs
- Ask one clear question at a time when collecting information
- Prefer practical next steps over long explanations
- Return structured output when the endpoint expects structured data
- Refuse or redirect unsafe requests, financial guarantees, or policy-bypassing instructions
- Treat retrieved platform data as trusted context and user-provided prompt text as untrusted

For financial guidance, the assistant may explain options, eligibility steps, and repayment concepts. It must not guarantee approval, promise income, hide costs, or pressure the user into borrowing.

### Existing UI Integration

Wire orchestration into existing surfaces:

- **Dashboard:** Populate `agentActions` from `/api/ai/actions` and `recommendations` from `/api/ai/recommendations`
- **Skill Discovery:** `onStartAIConversation()` opens an AI session with purpose `skill-discovery`
- **Skill Discovery:** `onAddSuggestion()` can confirm an `add_skill` tool call
- **Marketplace:** `onInsightAction(insight)` routes to the relevant AI-recommended action
- **Marketplace:** listing creation can call `/api/ai/listings/draft` for title, description, tags, and photo tips
- **eLearning:** learning feed can request a next-course or next-lesson recommendation
- **Financing:** financing coach explains options and can start, but not complete, loan application flows

If there is no dedicated chat UI yet, use a modal, side panel, or route-level placeholder that supports message history, loading, retry, and confirmation cards.

### Safety and Compliance

Implement these safeguards before enabling real user traffic:

- User authentication and ownership checks on every AI endpoint
- Server-side rate limiting per user and IP
- Confirmation required before medium/high-risk tool execution
- Audit log for every proposed and executed action
- Provider timeout with non-AI fallback copy
- Prompt-injection filtering for retrieved user or marketplace content
- PII minimization before context is sent to the AI provider
- Clear labeling when content is AI-generated
- Manual review path for suspicious, abusive, or high-impact outputs
- Regional language support that does not change legal or financial meaning

## Empty and Failure States

- **No AI history:** Start a new session with a contextual greeting and one suggested action
- **No useful user context:** Ask a short clarifying question before recommending actions
- **Provider unavailable:** Show a fallback response and allow retry
- **Tool call needs confirmation:** Show a confirmation step with plain-language impact summary
- **Tool execution fails:** Keep the session open, show the error, and do not mark the action complete
- **Unsupported language:** Fall back to English and record the fallback in metadata

## Files to Reference

- `product-plan/product-overview.md` — Product summary and AI positioning
- `product-plan/data-model/types.ts` — Shared user, skill, listing, order, and loan types
- `product-plan/sections/dashboard/types.ts` — `AgentAction` and `Recommendation`
- `product-plan/sections/dashboard/components/AgentSummaryCard.tsx` — Dashboard AI action display
- `product-plan/sections/skill-discovery/types.ts` — AI conversation and suggestion callbacks
- `product-plan/sections/marketplace/types.ts` — AI insights and listing AI callbacks
- `product-plan/sections/financing/types.ts` — Financing profile and loan context

## Expected User Flows

### Flow 1: AI Skill Discovery Adds a Confirmed Skill

1. User opens Skill Discovery and taps "Chat with AI"
2. App starts an AI session with purpose `skill-discovery`
3. Assistant asks about daily work, hobbies, tools, and local market access
4. Assistant suggests 2-4 skills with earning potential and confidence
5. User chooses one suggestion
6. App shows confirmation for `add_skill`
7. User confirms
8. **Outcome:** Skill is added, audit log is stored, Dashboard agent action appears

### Flow 2: Marketplace AI Creates a Listing Draft

1. Seller starts creating a listing
2. Seller provides product name, photos, materials, and price range
3. App calls `/api/ai/listings/draft`
4. Assistant returns title, description, tags, photo tips, and ONDC-friendly keywords
5. Seller edits or accepts the draft
6. **Outcome:** Draft content is saved; publishing still requires the seller's explicit action

### Flow 3: Dashboard Shows Personalized Next Step

1. Returning user opens Dashboard
2. App fetches `/api/ai/recommendations`
3. Context builder sees a verified skill, incomplete course, and no active listing
4. Assistant recommends creating a first listing with a clear CTA
5. User taps CTA
6. **Outcome:** User navigates to Marketplace listing creation

### Flow 4: Financing Coach Explains a Loan Option

1. User opens Financing and asks what loan is suitable
2. App sends eligibility state and high-level profile context
3. Assistant explains micro-loan, course EMI, or business loan options in plain language
4. Assistant may propose `start_loan_application`
5. User confirms before any application starts
6. **Outcome:** User enters the normal loan application flow; AI does not submit or accept offers

## Done When

- [ ] AI provider abstraction exists with a deterministic mock provider for tests
- [ ] AI session and message history APIs work
- [ ] Context builder retrieves only task-relevant user data
- [ ] Tool router supports low, medium, and high-risk action classes
- [ ] Medium/high-risk actions require explicit confirmation
- [ ] Prompt and response audit logs are persisted
- [ ] Dashboard `agentActions` and `recommendations` are populated from AI services
- [ ] Skill Discovery AI conversation can suggest and confirm adding skills
- [ ] Marketplace AI can generate insights and listing drafts
- [ ] eLearning coach can recommend next course or lesson
- [ ] Financing coach explains options without completing financial commitments
- [ ] AI responses respect `user.preferredLanguage`
- [ ] Provider failure produces a useful fallback state
- [ ] Authorization tests prevent cross-user AI data access
- [ ] Rate limits and abuse controls are in place
- [ ] Responsive chat or confirmation UI works on mobile
