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
  rose:  { icon: 'text-rose-400',  ring: 'ring-rose-800/40',  bg: 'bg-rose-500/10'  },
  amber: { icon: 'text-amber-400', ring: 'ring-amber-800/40', bg: 'bg-amber-500/10' },
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-stone-950/95 backdrop-blur-sm border-b border-stone-100 dark:border-stone-800/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <span className="text-2xl font-bold text-rose-600 dark:text-rose-400 tracking-tight">
            Shakti
          </span>
          <div className="flex items-center gap-1">
            <LanguagePicker />
            <ThemeToggle />
            <button
              onClick={onGetStarted}
              className="text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors px-4 py-2 rounded-full"
            >
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Get Started
              <LuArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 px-5 sm:px-8 overflow-hidden bg-white dark:bg-stone-950">
        {/* Dot grid texture */}
        <div className="absolute inset-0 bg-dot-grid pointer-events-none" aria-hidden />
        {/* Fade out grid at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-stone-950 to-transparent pointer-events-none" aria-hidden />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-10 items-center">

          {/* Copy */}
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-900/40 text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-7 animate-fade-up">
              <LuSparkles className="w-3.5 h-3.5" />
              AI-Powered Economic Empowerment
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-7 animate-fade-up-1">
              <span className="text-stone-900 dark:text-stone-50">Discover</span>
              <br />
              <span className="text-stone-900 dark:text-stone-50">your skills.</span>
              <br />
              <span className="text-rose-600 dark:text-rose-400">Build your</span>
              <br />
              <span className="text-rose-600 dark:text-rose-400">future.</span>
            </h1>

            <p className="text-lg text-stone-500 dark:text-stone-400 leading-relaxed max-w-md mb-9 animate-fade-up-2">
              Shakti helps women across India identify their marketable skills, learn from achievers,
              sell in national markets, and access financing — all in their own language.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-9 animate-fade-up-2">
              <button
                onClick={onGetStarted}
                className="group flex items-center gap-2 bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white font-semibold px-7 py-3.5 rounded-full transition-colors shadow-lg shadow-rose-200/60 dark:shadow-rose-900/40"
              >
                Start Your Journey
                <LuArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
              </button>
              <a
                href="#how-it-works"
                className="text-stone-700 dark:text-stone-300 font-semibold px-7 py-3.5 rounded-full border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors"
              >
                See How It Works
              </a>
            </div>

            <p className="text-sm text-stone-400 dark:text-stone-500 animate-fade-up-3">
              Trusted by{' '}
              <span className="font-semibold text-stone-600 dark:text-stone-300">50,000+ women</span>{' '}
              across India
            </p>
          </div>

          {/* Language cloud */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end animate-fade-up-1">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 select-none" aria-hidden>
              <div className="absolute inset-0 rounded-full bg-rose-50 dark:bg-rose-950/30" />
              <div className="absolute inset-6 rounded-full bg-rose-100 dark:bg-rose-900/20 opacity-60" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-stone-900 rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-sm ring-1 ring-stone-100 dark:ring-stone-700">
                  <span className="text-2xl font-bold text-stone-900 dark:text-stone-50 leading-none">8</span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 font-medium">languages</span>
                </div>
              </div>

              <span className="absolute top-6 left-10 bg-white dark:bg-stone-800 ring-1 ring-stone-100 dark:ring-stone-700 shadow-sm rounded-full px-3.5 py-1.5 text-sm font-medium text-stone-700 dark:text-stone-200" lang="hi">हिंदी</span>
              <span className="absolute top-14 right-4 bg-rose-600 text-white rounded-full px-3.5 py-1.5 text-sm font-medium shadow-md" lang="ta">தமிழ்</span>
              <span className="absolute top-1/3 left-2 bg-white dark:bg-stone-800 ring-1 ring-stone-100 dark:ring-stone-700 shadow-sm rounded-full px-3.5 py-1.5 text-sm font-medium text-stone-700 dark:text-stone-200" lang="te">తెలుగు</span>
              <span className="absolute top-[42%] right-3 bg-amber-50 dark:bg-amber-950/60 ring-1 ring-amber-100 dark:ring-amber-900/40 rounded-full px-3.5 py-1.5 text-sm font-medium text-amber-800 dark:text-amber-300" lang="kn">ಕನ್ನಡ</span>
              <span className="absolute bottom-20 left-14 bg-white dark:bg-stone-800 ring-1 ring-stone-100 dark:ring-stone-700 shadow-sm rounded-full px-3.5 py-1.5 text-sm font-medium text-stone-700 dark:text-stone-200" lang="bn">বাংলা</span>
              <span className="absolute bottom-14 right-5 bg-rose-50 dark:bg-rose-950/40 ring-1 ring-rose-100 dark:ring-rose-900/40 rounded-full px-3.5 py-1.5 text-sm font-medium text-rose-700 dark:text-rose-300" lang="gu">ગુજ</span>
              <span className="absolute bottom-6 left-5 bg-white dark:bg-stone-800 ring-1 ring-stone-100 dark:ring-stone-700 shadow-sm rounded-full px-3.5 py-1.5 text-sm font-medium text-stone-700 dark:text-stone-200" lang="mr">मराठी</span>
              <span className="absolute top-[52%] left-[38%] bg-stone-900 dark:bg-stone-700 text-white rounded-full px-3.5 py-1.5 text-sm font-medium shadow-md" lang="pa">ਪੰਜਾਬੀ</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust band ─────────────────────────────────────────── */}
      <div className="bg-stone-900 dark:bg-stone-900 py-5 px-5 sm:px-8 border-y border-stone-800">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-stone-400 text-sm sm:text-base leading-relaxed">
            <span className="font-bold text-white">50,000+</span> women empowered
            <span className="mx-3 text-stone-700">·</span>
            <span className="font-bold text-white">200+</span> skills discovered
            <span className="mx-3 text-stone-700">·</span>
            <span className="font-bold text-white">₹12Cr+</span> income generated
            <span className="mx-3 text-stone-700">·</span>
            <span className="font-bold text-white">8</span> Indian languages
          </p>
        </div>
      </div>

      {/* ── Features bento ─────────────────────────────────────── */}
      <section className="py-24 px-5 sm:px-8 bg-stone-50 dark:bg-stone-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-3">
              The Platform
            </p>
            <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-50 max-w-md leading-tight">
              Five tools, one complete journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Dashboard — large, rose */}
            <div className="relative overflow-hidden rounded-2xl bg-rose-600 dark:bg-rose-700 p-7 text-white md:col-span-2 lg:col-span-2 hover:opacity-95 transition-opacity duration-200">
              <LuChartBarBig
                className="absolute -bottom-4 -right-4 w-36 h-36 text-rose-500 dark:text-rose-600 opacity-30"
                aria-hidden
              />
              <div className="relative z-10">
                <span className="text-xs font-semibold text-rose-200 uppercase tracking-widest">
                  Dashboard
                </span>
                <h3 className="mt-2 text-2xl font-bold leading-snug">
                  Your complete journey, at a glance
                </h3>
                <p className="mt-3 text-rose-100 text-sm leading-relaxed max-w-sm">
                  Skills earned, courses in progress, marketplace activity, and financing status — all on one screen. Always know your next step.
                </p>
              </div>
            </div>

            {/* Skill Discovery */}
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-stone-800/60 ring-1 ring-stone-100 dark:ring-stone-700/50 p-7 hover:ring-stone-200 dark:hover:ring-stone-600 transition-colors duration-200">
              <LuBrain
                className="absolute -bottom-3 -right-3 w-28 h-28 text-stone-100 dark:text-stone-700"
                aria-hidden
              />
              <div className="relative z-10">
                <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
                  Skill Discovery
                </span>
                <h3 className="mt-2 text-lg font-bold text-stone-900 dark:text-stone-50 leading-snug">
                  Find your marketable skills
                </h3>
                <p className="mt-2 text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                  AI conversation, voice assessment, and visual surveys — in your language.
                </p>
              </div>
            </div>

            {/* eLearning */}
            <div className="relative overflow-hidden rounded-2xl bg-amber-50 dark:bg-amber-950/25 ring-1 ring-amber-100 dark:ring-amber-900/40 p-7 hover:ring-amber-200 dark:hover:ring-amber-800/60 transition-colors duration-200">
              <LuBookOpen
                className="absolute -bottom-3 -right-3 w-28 h-28 text-amber-100 dark:text-amber-900/60"
                aria-hidden
              />
              <div className="relative z-10">
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                  eLearning
                </span>
                <h3 className="mt-2 text-lg font-bold text-stone-900 dark:text-stone-50 leading-snug">
                  Learn from achievers
                </h3>
                <p className="mt-2 text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                  Courses, live bootcamps, and sessions with women who built it from scratch.
                </p>
              </div>
            </div>

            {/* Marketplace */}
            <div className="relative overflow-hidden rounded-2xl bg-rose-50 dark:bg-rose-950/25 ring-1 ring-rose-100 dark:ring-rose-900/40 p-7 hover:ring-rose-200 dark:hover:ring-rose-800/60 transition-colors duration-200">
              <LuShoppingBag
                className="absolute -bottom-3 -right-3 w-28 h-28 text-rose-100 dark:text-rose-900/60"
                aria-hidden
              />
              <div className="relative z-10">
                <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
                  Marketplace
                </span>
                <h3 className="mt-2 text-lg font-bold text-stone-900 dark:text-stone-50 leading-snug">
                  Sell to all of India
                </h3>
                <p className="mt-2 text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                  ONDC-connected listings and video commerce with nationwide reach.
                </p>
              </div>
            </div>

            {/* Financing */}
            <div className="relative overflow-hidden rounded-2xl bg-stone-900 dark:bg-stone-800 p-7 hover:bg-stone-800 dark:hover:bg-stone-700/80 transition-colors duration-200">
              <LuWallet
                className="absolute -bottom-3 -right-3 w-28 h-28 text-stone-700 dark:text-stone-600"
                aria-hidden
              />
              <div className="relative z-10">
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
                  Financing
                </span>
                <h3 className="mt-2 text-lg font-bold text-white leading-snug">
                  Capital when you need it
                </h3>
                <p className="mt-2 text-stone-400 text-sm leading-relaxed">
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
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-200 uppercase tracking-widest mb-2">
                      <LuZap className="w-3.5 h-3.5" />
                      Agentic AI
                    </span>
                    <h3 className="text-2xl font-bold text-white leading-snug">
                      Five agents, one intelligence
                    </h3>
                    <p className="mt-3 text-rose-100 text-sm leading-relaxed">
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
                        <span className={`w-2 h-2 rounded-full bg-rose-300 ${cls} shrink-0`} />
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
      <section id="how-it-works" className="py-24 px-5 sm:px-8 bg-white dark:bg-stone-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-3">
              The Journey
            </p>
            <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-50 leading-tight">
              Three steps to economic independence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20">
            {steps.map((step) => (
              <div key={step.number}>
                <div
                  className="text-[6rem] font-bold text-rose-100 dark:text-rose-950 leading-none mb-3 select-none"
                  aria-hidden
                >
                  {step.number}
                </div>
                <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
                  {step.label}
                </span>
                <h3 className="mt-2 text-xl font-bold text-stone-900 dark:text-stone-50">{step.title}</h3>
                <p className="mt-3 text-stone-500 dark:text-stone-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agentic AI Orchestration ────────────────────────────── */}
      <section className="relative py-24 px-5 sm:px-8 bg-stone-950 overflow-hidden">
        {/* Dot grid texture — always dark */}
        <div className="absolute inset-0 bg-dot-grid-dark pointer-events-none" aria-hidden />
        {/* Edge fades */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-stone-950 to-transparent pointer-events-none" aria-hidden />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-950 to-transparent pointer-events-none" aria-hidden />

        <div className="relative max-w-7xl mx-auto">

          {/* Section header */}
          <div className="mb-14">
            <p className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-3">
              Agentic AI Orchestration
            </p>
            <h2 className="text-4xl font-bold text-stone-50 max-w-xl leading-tight">
              Five specialized agents. One seamless intelligence.
            </h2>
            <p className="mt-5 text-stone-400 max-w-2xl leading-relaxed">
              Under the hood, Shakti runs a multi-agent orchestration layer. When you ask anything — from
              "what can I sell?" to "can I get a loan?" — multiple AI agents activate, each expert in its
              domain, their outputs woven into one coherent response. You see a simple answer. Behind it
              is a coordinated team.
            </p>
          </div>

          {/* Orchestrator — the hub */}
          <div className="relative rounded-2xl bg-stone-900 ring-1 ring-stone-800 p-8 mb-3">
            <div className="absolute top-5 right-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse-dot" />
              <span className="text-xs text-stone-500 font-mono tracking-wide">always active</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start gap-7">
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-xl bg-rose-500/10 ring-1 ring-rose-500/20 flex items-center justify-center">
                  <LuNetwork className="w-7 h-7 text-rose-400" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-stone-500 font-mono uppercase tracking-widest">core</span>
                  <h3 className="text-xl font-bold text-stone-50">Orchestrator</h3>
                </div>
                <p className="text-stone-400 leading-relaxed max-w-2xl text-sm">
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
                      className="inline-flex items-center gap-1.5 text-xs text-stone-400 bg-stone-800 ring-1 ring-stone-700/60 rounded-full px-3 py-1"
                    >
                      <LuCheck className="w-3 h-3 text-rose-400 shrink-0" />
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Connector */}
          <div className="flex items-center justify-center mb-3" aria-hidden>
            <div className="w-px h-8 bg-gradient-to-b from-stone-700 to-stone-800" />
          </div>
          <div className="flex items-center justify-center mb-3" aria-hidden>
            <div className="text-stone-700 text-xs font-mono tracking-widest uppercase">dispatches to</div>
          </div>
          <div className="flex items-center justify-center mb-4" aria-hidden>
            <div className="w-px h-6 bg-gradient-to-b from-stone-800 to-stone-900" />
          </div>

          {/* 4 specialist agents */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {agents.map((agent) => {
              const accent = agentAccentClasses[agent.accent]
              return (
                <div
                  key={agent.id}
                  className="rounded-2xl bg-stone-900 ring-1 ring-stone-800 p-6 hover:ring-stone-700 transition-colors duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-11 h-11 rounded-xl ${accent.bg} ring-1 ${accent.ring} flex items-center justify-center`}>
                      <agent.Icon className={`w-5 h-5 ${accent.icon}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2.5 mb-1">
                        <span className="text-xs text-stone-600 font-mono">{agent.id}</span>
                        <h4 className="text-base font-bold text-stone-50">{agent.name}</h4>
                      </div>
                      <p className={`text-xs font-medium mb-3 ${accent.icon}`}>{agent.tagline}</p>
                      <p className="text-stone-400 text-sm leading-relaxed mb-4">
                        {agent.description}
                      </p>
                      <ul className="space-y-1.5">
                        {agent.capabilities.map((cap) => (
                          <li key={cap} className="flex items-center gap-2 text-xs text-stone-500">
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
          <p className="mt-10 text-center text-stone-600 text-sm">
            All agents communicate in{' '}
            <span className="text-stone-300 font-medium">8 Indian languages</span>
            {' '}— Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, Gujarati, and English.
          </p>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────── */}
      <section className="py-24 px-5 sm:px-8 bg-stone-50 dark:bg-stone-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-3">
              Stories
            </p>
            <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-50">
              Real women, real change
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white dark:bg-stone-800/60 rounded-2xl p-7 ring-1 ring-stone-100 dark:ring-stone-700/50 flex flex-col"
              >
                <div className="flex gap-0.5 mb-5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <LuStar key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden />
                  ))}
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${
                      t.accent === 'rose' ? 'bg-rose-500' : 'bg-amber-500'
                    }`}
                    aria-hidden
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">{t.name}</p>
                    <p className="text-stone-400 dark:text-stone-500 text-xs mt-0.5">{t.state}</p>
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
          <p className="text-rose-100 text-lg leading-relaxed mb-9">
            Join 50,000+ women across India who are discovering their skills and building their
            future with Shakti.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-rose-700 font-bold px-10 py-4 rounded-full hover:bg-rose-50 transition-colors text-base shadow-2xl shadow-rose-900/40"
          >
            Get Started — It&apos;s Free
          </button>
          <p className="mt-5 text-rose-100 text-sm opacity-80">
            No credit card needed. Available in 8 languages.
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="py-10 px-5 sm:px-8 bg-stone-950 dark:bg-stone-950 border-t border-stone-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xl font-bold text-rose-400 tracking-tight">Shakti</span>
          <p className="text-stone-500 text-sm text-center">
            AI-powered economic empowerment for women across India
          </p>
          <p className="text-stone-600 text-sm">© 2025 Shakti Foundation</p>
        </div>
      </footer>

    </div>
  )
}
