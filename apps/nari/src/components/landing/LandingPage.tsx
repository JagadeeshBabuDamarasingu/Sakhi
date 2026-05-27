'use client'

import {
  LuBrain,
  LuBookOpen,
  LuShoppingBag,
  LuWallet,
  LuChartBarBig,
  LuArrowRight,
  LuStar,
  LuSparkles,
  LuNetwork,
  LuRoute,
  LuShield,
  LuZap,
  LuCheck,
} from 'react-icons/lu'
import { ThemeToggle } from '@/components/shell/ThemeToggle'
import { LanguagePicker } from '@/components/shell/LanguagePicker'

interface LandingPageProps {
  onGetStarted: () => void
}

const testimonials = [
  {
    quote:
      'I never knew I could sell my embroidery online. Shakti helped me discover my skill and now I earn ₹18,000 a month.',
    name: 'Lakshmi Devi',
    state: 'Andhra Pradesh',
    initials: 'LD',
    accent: 'rose' as const,
  },
  {
    quote:
      'The Hindi videos made it easy to understand. I got a micro-loan to buy a sewing machine and doubled my income.',
    name: 'Fatima Shaikh',
    state: 'Maharashtra',
    initials: 'FS',
    accent: 'amber' as const,
  },
  {
    quote:
      'From homemaker to digital entrepreneur. Shakti connected me with customers across India.',
    name: 'Preethi Nair',
    state: 'Kerala',
    initials: 'PN',
    accent: 'rose' as const,
  },
]

const steps = [
  {
    number: '01',
    label: 'Discover',
    title: 'Find your skills',
    desc: 'Take an AI-powered assessment in your language. Identify what you can offer and understand its real market value.',
  },
  {
    number: '02',
    label: 'Learn',
    title: 'Build your confidence',
    desc: 'Access courses, watch achievers in action, and attend live bootcamps led by women who started just like you.',
  },
  {
    number: '03',
    label: 'Earn',
    title: 'Build your business',
    desc: 'List your services, sell your products, reach customers across India, and access financing to grow.',
  },
]

const agents = [
  {
    id: '01',
    name: 'Skill Scout',
    Icon: LuBrain,
    accent: 'rose',
    tagline: 'Discovers what you can offer',
    description:
      'Conducts conversational interviews, voice assessments, and visual surveys. Maps your knowledge and experience to live market demand signals.',
    capabilities: ['Conversational assessment', 'Voice analysis', 'Skill-to-market mapping', 'Gap identification'],
  },
  {
    id: '02',
    name: 'Pathfinder',
    Icon: LuRoute,
    accent: 'amber',
    tagline: 'Charts your learning journey',
    description:
      'Designs a personalized curriculum from your assessed gaps. Adapts to your learning pace and income goal, curating the right courses and mentors.',
    capabilities: ['Personalized curriculum', 'Pace adaptation', 'Mentor matching', 'Progress forecasting'],
  },
  {
    id: '03',
    name: 'Market Matcher',
    Icon: LuShoppingBag,
    accent: 'rose',
    tagline: 'Connects supply to demand',
    description:
      'Analyzes buyer patterns in your region, recommends competitive pricing, and surfaces the highest-demand opportunities for your specific skills.',
    capabilities: ['Buyer intent matching', 'Dynamic pricing', 'Listing optimization', 'Demand forecasting'],
  },
  {
    id: '04',
    name: 'Finance Guardian',
    Icon: LuShield,
    accent: 'amber',
    tagline: 'Unlocks credit when you need it',
    description:
      'Evaluates creditworthiness using income signals, course completions, and marketplace activity — not just credit history — to match the right loan product.',
    capabilities: ['Income signal analysis', 'Loan product matching', 'EMI scenario planning', 'Repayment guidance'],
  },
]

const agentAccentClasses: Record<string, { icon: string; ring: string; bg: string }> = {
  rose:  { icon: 'text-primary',   ring: 'ring-primary/40',   bg: 'bg-primary/10'  },
  amber: { icon: 'text-secondary', ring: 'ring-secondary/40', bg: 'bg-secondary/10' },
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-base-100">

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-base-100/95 backdrop-blur-sm border-b border-base-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <span className="text-2xl font-bold text-primary tracking-tight">
            Shakti
          </span>
          <div className="flex items-center gap-1">
            <LanguagePicker />
            <ThemeToggle />
            <button
              onClick={onGetStarted}
              className="text-sm font-medium text-base-content/70 hover:text-primary transition-colors px-4 py-2 rounded-full"
            >
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-content text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Get Started
              <LuArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 px-5 sm:px-8 overflow-hidden bg-base-100">
        {/* Dot grid texture */}
        <div className="absolute inset-0 bg-dot-grid pointer-events-none" aria-hidden />
        {/* Fade out grid at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-base-100 to-transparent pointer-events-none" aria-hidden />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-10 items-center">

          {/* Copy */}
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 text-primary bg-primary/10 border border-primary/20 text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-7 animate-fade-up">
              <LuSparkles className="w-3.5 h-3.5" />
              AI-Powered Economic Empowerment
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-7 animate-fade-up-1">
              <span className="text-base-content">Discover</span>
              <br />
              <span className="text-base-content">your skills.</span>
              <br />
              <span className="text-primary">Build your</span>
              <br />
              <span className="text-primary">future.</span>
            </h1>

            <p className="text-lg text-base-content/60 leading-relaxed max-w-md mb-9 animate-fade-up-2">
              Shakti helps women across India identify their marketable skills, learn from achievers,
              sell in national markets, and access financing — all in their own language.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-9 animate-fade-up-2">
              <button
                onClick={onGetStarted}
                className="group flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-content font-semibold px-7 py-3.5 rounded-full transition-colors shadow-lg shadow-primary/20"
              >
                Start Your Journey
                <LuArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
              </button>
              <a
                href="#how-it-works"
                className="text-base-content/80 font-semibold px-7 py-3.5 rounded-full border border-base-300 hover:border-base-content/30 hover:bg-base-200 transition-colors"
              >
                See How It Works
              </a>
            </div>

            <p className="text-sm text-base-content/50 animate-fade-up-3">
              Trusted by{' '}
              <span className="font-semibold text-base-content/80">50,000+ women</span>{' '}
              across India
            </p>
          </div>

          {/* Language cloud */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end animate-fade-up-1">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 select-none" aria-hidden>
              <div className="absolute inset-0 rounded-full bg-primary/5" />
              <div className="absolute inset-6 rounded-full bg-primary/10 opacity-60" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-base-100 rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-sm ring-1 ring-base-200">
                  <span className="text-2xl font-bold text-base-content leading-none">8</span>
                  <span className="text-[10px] text-base-content/60 mt-0.5 font-medium">languages</span>
                </div>
              </div>

              <span className="absolute top-6 left-10 bg-base-100 ring-1 ring-base-200 shadow-sm rounded-full px-3.5 py-1.5 text-sm font-medium text-base-content/80" lang="hi">हिंदी</span>
              <span className="absolute top-14 right-4 bg-primary text-primary-content rounded-full px-3.5 py-1.5 text-sm font-medium shadow-md" lang="ta">தமிழ்</span>
              <span className="absolute top-1/3 left-2 bg-base-100 ring-1 ring-base-200 shadow-sm rounded-full px-3.5 py-1.5 text-sm font-medium text-base-content/80" lang="te">తెలుగు</span>
              <span className="absolute top-[42%] right-3 bg-secondary/10 ring-1 ring-secondary/20 rounded-full px-3.5 py-1.5 text-sm font-medium text-secondary" lang="kn">ಕನ್ನಡ</span>
              <span className="absolute bottom-20 left-14 bg-base-100 ring-1 ring-base-200 shadow-sm rounded-full px-3.5 py-1.5 text-sm font-medium text-base-content/80" lang="bn">বাংলা</span>
              <span className="absolute bottom-14 right-5 bg-primary/10 ring-1 ring-primary/20 rounded-full px-3.5 py-1.5 text-sm font-medium text-primary" lang="gu">ગુજ</span>
              <span className="absolute bottom-6 left-5 bg-base-100 ring-1 ring-base-200 shadow-sm rounded-full px-3.5 py-1.5 text-sm font-medium text-base-content/80" lang="mr">मराठी</span>
              <span className="absolute top-[52%] left-[38%] bg-neutral text-neutral-content rounded-full px-3.5 py-1.5 text-sm font-medium shadow-md" lang="pa">ਪੰਜਾਬੀ</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust band ─────────────────────────────────────────── */}
      <div className="bg-neutral py-5 px-5 sm:px-8 border-y border-neutral-content/20">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-neutral-content/60 text-sm sm:text-base leading-relaxed">
            <span className="font-bold text-neutral-content">50,000+</span> women empowered
            <span className="mx-3 text-neutral-content/30">·</span>
            <span className="font-bold text-neutral-content">200+</span> skills discovered
            <span className="mx-3 text-neutral-content/30">·</span>
            <span className="font-bold text-neutral-content">₹12Cr+</span> income generated
            <span className="mx-3 text-neutral-content/30">·</span>
            <span className="font-bold text-neutral-content">8</span> Indian languages
          </p>
        </div>
      </div>

      {/* ── Features bento ─────────────────────────────────────── */}
      <section className="py-24 px-5 sm:px-8 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              The Platform
            </p>
            <h2 className="text-4xl font-bold text-base-content max-w-md leading-tight">
              Five tools, one complete journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Dashboard — large, primary */}
            <div className="relative overflow-hidden rounded-2xl bg-primary p-7 text-primary-content md:col-span-2 lg:col-span-2 hover:opacity-95 transition-opacity duration-200">
              <LuChartBarBig
                className="absolute -bottom-4 -right-4 w-36 h-36 text-primary-content opacity-20"
                aria-hidden
              />
              <div className="relative z-10">
                <span className="text-xs font-semibold text-primary-content/60 uppercase tracking-widest">
                  Dashboard
                </span>
                <h3 className="mt-2 text-2xl font-bold leading-snug">
                  Your complete journey, at a glance
                </h3>
                <p className="mt-3 text-primary-content/80 text-sm leading-relaxed max-w-sm">
                  Skills earned, courses in progress, marketplace activity, and financing status — all on one screen. Always know your next step.
                </p>
              </div>
            </div>

            {/* Skill Discovery */}
            <div className="relative overflow-hidden rounded-2xl bg-base-100 ring-1 ring-base-300 p-7 hover:ring-base-content/20 transition-colors duration-200">
              <LuBrain
                className="absolute -bottom-3 -right-3 w-28 h-28 text-base-content/10"
                aria-hidden
              />
              <div className="relative z-10">
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  Skill Discovery
                </span>
                <h3 className="mt-2 text-lg font-bold text-base-content leading-snug">
                  Find your marketable skills
                </h3>
                <p className="mt-2 text-base-content/60 text-sm leading-relaxed">
                  AI conversation, voice assessment, and visual surveys — in your language.
                </p>
              </div>
            </div>

            {/* eLearning */}
            <div className="relative overflow-hidden rounded-2xl bg-secondary/10 ring-1 ring-secondary/20 p-7 hover:ring-secondary/40 transition-colors duration-200">
              <LuBookOpen
                className="absolute -bottom-3 -right-3 w-28 h-28 text-secondary/20"
                aria-hidden
              />
              <div className="relative z-10">
                <span className="text-xs font-semibold text-secondary uppercase tracking-widest">
                  eLearning
                </span>
                <h3 className="mt-2 text-lg font-bold text-base-content leading-snug">
                  Learn from achievers
                </h3>
                <p className="mt-2 text-base-content/60 text-sm leading-relaxed">
                  Courses, live bootcamps, and sessions with women who built it from scratch.
                </p>
              </div>
            </div>

            {/* Marketplace */}
            <div className="relative overflow-hidden rounded-2xl bg-primary/5 ring-1 ring-primary/15 p-7 hover:ring-primary/30 transition-colors duration-200">
              <LuShoppingBag
                className="absolute -bottom-3 -right-3 w-28 h-28 text-primary/15"
                aria-hidden
              />
              <div className="relative z-10">
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  Marketplace
                </span>
                <h3 className="mt-2 text-lg font-bold text-base-content leading-snug">
                  Sell to all of India
                </h3>
                <p className="mt-2 text-base-content/60 text-sm leading-relaxed">
                  ONDC-connected listings and video commerce with nationwide reach.
                </p>
              </div>
            </div>

            {/* Financing */}
            <div className="relative overflow-hidden rounded-2xl bg-neutral p-7 hover:bg-neutral/90 transition-colors duration-200">
              <LuWallet
                className="absolute -bottom-3 -right-3 w-28 h-28 text-neutral-content/20"
                aria-hidden
              />
              <div className="relative z-10">
                <span className="text-xs font-semibold text-neutral-content/50 uppercase tracking-widest">
                  Financing
                </span>
                <h3 className="mt-2 text-lg font-bold text-neutral-content leading-snug">
                  Capital when you need it
                </h3>
                <p className="mt-2 text-neutral-content/60 text-sm leading-relaxed">
                  Micro-loans via OCEN. No collateral. Pay as you grow.
                </p>
              </div>
            </div>

            {/* Agentic AI — full width, warm gradient */}
            <div
              className="relative overflow-hidden rounded-2xl p-7 md:col-span-2 lg:col-span-3 hover:opacity-97 transition-opacity duration-200"
              style={{ background: 'linear-gradient(135deg, #be123c 0%, #9f1239 35%, #b45309 100%)' }}
            >
              <LuNetwork
                className="absolute -bottom-5 -right-5 w-48 h-48 text-white opacity-[0.07]"
                aria-hidden
              />
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-7">
                  <div className="max-w-lg">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">
                      <LuZap className="w-3.5 h-3.5" />
                      Agentic AI
                    </span>
                    <h3 className="text-2xl font-bold text-white leading-snug">
                      Five agents, one intelligence
                    </h3>
                    <p className="mt-3 text-white/80 text-sm leading-relaxed">
                      Specialized AI agents work together invisibly: assessing your skills, charting your path,
                      connecting you with buyers, and evaluating your financing — all synthesized into one coherent
                      answer, spoken in your language.
                    </p>
                  </div>

                  {/* Agent status list */}
                  <div className="flex flex-col gap-2.5 lg:shrink-0">
                    {[
                      { name: 'Orchestrator',      cls: 'animate-pulse-dot-1' },
                      { name: 'Skill Scout',        cls: 'animate-pulse-dot-2' },
                      { name: 'Pathfinder',         cls: 'animate-pulse-dot-3' },
                      { name: 'Market Matcher',     cls: 'animate-pulse-dot-4' },
                      { name: 'Finance Guardian',   cls: 'animate-pulse-dot-5' },
                    ].map(({ name, cls }) => (
                      <div key={name} className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full bg-white/70 ${cls} shrink-0`} />
                        <span className="text-xs font-medium text-white/85">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-5 sm:px-8 bg-base-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              The Journey
            </p>
            <h2 className="text-4xl font-bold text-base-content leading-tight">
              Three steps to economic independence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20">
            {steps.map((step) => (
              <div key={step.number}>
                <div
                  className="text-[6rem] font-bold text-primary/15 leading-none mb-3 select-none"
                  aria-hidden
                >
                  {step.number}
                </div>
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  {step.label}
                </span>
                <h3 className="mt-2 text-xl font-bold text-base-content">{step.title}</h3>
                <p className="mt-3 text-base-content/60 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agentic AI Orchestration ────────────────────────────── */}
      <section className="relative py-24 px-5 sm:px-8 bg-neutral overflow-hidden">
        {/* Dot grid texture — always dark */}
        <div className="absolute inset-0 bg-dot-grid-dark pointer-events-none" aria-hidden />
        {/* Edge fades */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-neutral to-transparent pointer-events-none" aria-hidden />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-neutral to-transparent pointer-events-none" aria-hidden />

        <div className="relative max-w-7xl mx-auto">

          {/* Section header */}
          <div className="mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Agentic AI Orchestration
            </p>
            <h2 className="text-4xl font-bold text-neutral-content max-w-xl leading-tight">
              Five specialized agents. One seamless intelligence.
            </h2>
            <p className="mt-5 text-neutral-content/60 max-w-2xl leading-relaxed">
              Under the hood, Shakti runs a multi-agent orchestration layer. When you ask anything — from
              "what can I sell?" to "can I get a loan?" — multiple AI agents activate, each expert in its
              domain, their outputs woven into one coherent response. You see a simple answer. Behind it
              is a coordinated team.
            </p>
          </div>

          {/* Orchestrator — the hub */}
          <div className="relative rounded-2xl bg-neutral-content/5 ring-1 ring-neutral-content/10 p-8 mb-3">
            <div className="absolute top-5 right-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
              <span className="text-xs text-neutral-content/40 font-mono tracking-wide">always active</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start gap-7">
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-xl bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center">
                  <LuNetwork className="w-7 h-7 text-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-neutral-content/40 font-mono uppercase tracking-widest">core</span>
                  <h3 className="text-xl font-bold text-neutral-content">Orchestrator</h3>
                </div>
                <p className="text-neutral-content/60 leading-relaxed max-w-2xl text-sm">
                  The central intelligence that receives every request, breaks it into specialized tasks,
                  dispatches them to the right agents in parallel, and assembles their outputs into one
                  complete, contextual response — all before you finish reading the question.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    'Intent classification',
                    'Agent routing',
                    'Context passing',
                    'Parallel dispatch',
                    'Response synthesis',
                    'Language normalization',
                  ].map((cap) => (
                    <span
                      key={cap}
                      className="inline-flex items-center gap-1.5 text-xs text-neutral-content/60 bg-neutral-content/5 ring-1 ring-neutral-content/10 rounded-full px-3 py-1"
                    >
                      <LuCheck className="w-3 h-3 text-primary shrink-0" />
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Connector */}
          <div className="flex items-center justify-center mb-3" aria-hidden>
            <div className="w-px h-8 bg-gradient-to-b from-neutral-content/20 to-neutral-content/10" />
          </div>
          <div className="flex items-center justify-center mb-3" aria-hidden>
            <div className="text-neutral-content/30 text-xs font-mono tracking-widest uppercase">dispatches to</div>
          </div>
          <div className="flex items-center justify-center mb-4" aria-hidden>
            <div className="w-px h-6 bg-gradient-to-b from-neutral-content/10 to-neutral-content/5" />
          </div>

          {/* 4 specialist agents */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {agents.map((agent) => {
              const accent = agentAccentClasses[agent.accent]
              return (
                <div
                  key={agent.id}
                  className="rounded-2xl bg-neutral-content/5 ring-1 ring-neutral-content/10 p-6 hover:ring-neutral-content/20 transition-colors duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-11 h-11 rounded-xl ${accent.bg} ring-1 ${accent.ring} flex items-center justify-center`}>
                      <agent.Icon className={`w-5 h-5 ${accent.icon}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2.5 mb-1">
                        <span className="text-xs text-neutral-content/40 font-mono">{agent.id}</span>
                        <h4 className="text-base font-bold text-neutral-content">{agent.name}</h4>
                      </div>
                      <p className={`text-xs font-medium mb-3 ${accent.icon}`}>{agent.tagline}</p>
                      <p className="text-neutral-content/60 text-sm leading-relaxed mb-4">
                        {agent.description}
                      </p>
                      <ul className="space-y-1.5">
                        {agent.capabilities.map((cap) => (
                          <li key={cap} className="flex items-center gap-2 text-xs text-neutral-content/40">
                            <LuCheck className={`w-3 h-3 shrink-0 ${accent.icon}`} />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer note */}
          <p className="mt-10 text-center text-neutral-content/40 text-sm">
            All agents communicate in{' '}
            <span className="text-neutral-content/80 font-medium">8 Indian languages</span>
            {' '}— Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, Gujarati, and English.
          </p>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────── */}
      <section className="py-24 px-5 sm:px-8 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Stories
            </p>
            <h2 className="text-4xl font-bold text-base-content">
              Real women, real change
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-base-100 rounded-2xl p-7 ring-1 ring-base-300 flex flex-col"
              >
                <div className="flex gap-0.5 mb-5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <LuStar key={i} className="w-4 h-4 fill-secondary text-secondary" aria-hidden />
                  ))}
                </div>
                <p className="text-base-content/80 leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${
                      t.accent === 'rose' ? 'bg-primary' : 'bg-secondary'
                    }`}
                    aria-hidden
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-base-content text-sm">{t.name}</p>
                    <p className="text-base-content/50 text-xs mt-0.5">{t.state}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section
        className="py-24 px-5 sm:px-8"
        style={{ background: 'linear-gradient(135deg, #be123c 0%, #9f1239 45%, #b45309 100%)' }}
      >
        <div className="max-w-xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4 leading-tight">Ready to start?</h2>
          <p className="text-white/80 text-lg leading-relaxed mb-9">
            Join 50,000+ women across India who are discovering their skills and building their
            future with Shakti.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-primary font-bold px-10 py-4 rounded-full hover:bg-white/90 transition-colors text-base shadow-2xl shadow-black/30"
          >
            Get Started — It&apos;s Free
          </button>
          <p className="mt-5 text-white/70 text-sm">
            No credit card needed. Available in 8 languages.
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="py-10 px-5 sm:px-8 bg-neutral border-t border-neutral-content/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xl font-bold text-primary tracking-tight">Shakti</span>
          <p className="text-neutral-content/50 text-sm text-center">
            AI-powered economic empowerment for women across India
          </p>
          <p className="text-neutral-content/40 text-sm">© 2025 Shakti Foundation</p>
        </div>
      </footer>

    </div>
  )
}
