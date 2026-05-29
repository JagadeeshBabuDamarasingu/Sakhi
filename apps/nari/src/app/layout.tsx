import type { Metadata } from 'next'
import {
  Poppins,
  IBM_Plex_Mono,
  Noto_Sans_Devanagari,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
  Noto_Sans_Kannada,
  Noto_Sans_Bengali,
  Noto_Sans_Gujarati,
} from 'next/font/google'
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

// Indian script fonts — self-hosted by Next.js, not preloaded (loaded on demand)
const notoDevanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], variable: '--font-noto-devanagari', display: 'swap', preload: false })
const notoTamil = Noto_Sans_Tamil({ subsets: ['tamil'], variable: '--font-noto-tamil', display: 'swap', preload: false })
const notoTelugu = Noto_Sans_Telugu({ subsets: ['telugu'], variable: '--font-noto-telugu', display: 'swap', preload: false })
const notoKannada = Noto_Sans_Kannada({ subsets: ['kannada'], variable: '--font-noto-kannada', display: 'swap', preload: false })
const notoBengali = Noto_Sans_Bengali({ subsets: ['bengali'], variable: '--font-noto-bengali', display: 'swap', preload: false })
const notoGujarati = Noto_Sans_Gujarati({ subsets: ['gujarati'], variable: '--font-noto-gujarati', display: 'swap', preload: false })

export const metadata: Metadata = {
  title: 'Shakti — Economic Empowerment for Women',
  description: 'AI-powered platform helping women across India discover skills, learn, earn, and access financing.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      data-theme="shakti"
      className={`${poppins.variable} ${ibmPlexMono.variable} ${notoDevanagari.variable} ${notoTamil.variable} ${notoTelugu.variable} ${notoKannada.variable} ${notoBengali.variable} ${notoGujarati.variable} h-full antialiased`}
      suppressHydrationWarning
    >
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
