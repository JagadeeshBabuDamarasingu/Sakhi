import type { Metadata } from 'next'
import { Poppins, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { AppShellWrapper } from '@/components/AppShellWrapper'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { I18nProvider } from '@/providers/I18nProvider'
import { ReactNode } from 'react'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shakti — Economic Empowerment for Women',
  description: 'AI-powered platform helping women across India discover skills, learn, earn, and access financing.',
}

// Applied before hydration to prevent flash of wrong theme
const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('sakhi_theme');
      var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      var theme = saved || preferred;
      if (theme === 'dark') document.documentElement.classList.add('dark');
    } catch(e) {}
  })();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Noto Sans for Indian script support */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&family=Noto+Sans+Tamil&family=Noto+Sans+Telugu&family=Noto+Sans+Kannada&family=Noto+Sans+Bengali&family=Noto+Sans+Gujarati&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">
        <ThemeProvider>
          <I18nProvider>
            <AppShellWrapper>{children}</AppShellWrapper>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
