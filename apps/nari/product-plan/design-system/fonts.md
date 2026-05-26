# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>` or CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## Font Usage

- **Headings:** Poppins (weights: 600, 700)
- **Body text:** Poppins (weights: 400, 500)
- **Code/technical:** IBM Plex Mono (weights: 400, 500)

## CSS Configuration

```css
body {
  font-family: 'Poppins', sans-serif;
}

code, pre, .mono {
  font-family: 'IBM Plex Mono', monospace;
}
```

## Tailwind Configuration

In your CSS entry point (Tailwind v4):

```css
@import "tailwindcss";

@theme {
  --font-sans: 'Poppins', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
}
```

## Notes

- Poppins is used for ALL text in the Shakti app — both headings and body
- The platform targets rural and semi-urban Indian users; Poppins has excellent readability at small sizes
- Multi-language support: Poppins covers Latin characters well; for Devanagari (Hindi) and other Indian scripts, consider adding `Noto Sans Devanagari` or similar as a fallback
