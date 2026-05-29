# Project Memory

- Do not run `pnpm install` or approve build commands without asking the user first.

## Page Layout Standard

Reference screens: `/marketplace` (SellerDashboard) and `/ai-orchestration`. All other screens must match their style.

### Outer container
```tsx
<div className="relative min-h-screen bg-base-200">
  <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-br from-primary/8 via-secondary/4 to-transparent -z-10 pointer-events-none" />
  <div className="max-w-{n}xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
```

### Back link
```tsx
<Link href="..." className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content mb-6 transition-colors">
  <HiOutlineArrowLeft className="w-4 h-4" />
  Back to …
</Link>
```

### Page header (every screen that isn't the home dashboard)
```tsx
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
  <div>
    <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Section name</p>
    <h1 className="text-2xl sm:text-3xl font-bold text-base-content">Page Title</h1>
    <p className="text-sm text-base-content/60 mt-1">One-line description</p>
  </div>
  <div className="flex items-center gap-3">{/* action buttons */}</div>
</div>
```

### Section labels
```tsx
<h2 className="text-xs font-semibold text-base-content/50 uppercase tracking-widest mb-4">Label</h2>
```

### Do not
- Use `text-stone-*` or `text-gray-*` for text — use `text-base-content/N` opacity variants.
- Use `mb-6` between major sections — use `mb-8`.
- Omit the eyebrow label on page headers.
- Use `max-w-2xl` or `max-w-3xl` for main dashboard/list screens — minimum `max-w-5xl`.
