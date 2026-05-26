'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LandingPage } from '@/components/landing/LandingPage'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('sakhi_user')) {
      router.replace('/dashboard')
    }
  }, [router])

  const handleGetStarted = () => {
    localStorage.setItem('sakhi_user', JSON.stringify({ name: 'Priya Sharma' }))
    router.push('/dashboard')
  }

  return <LandingPage onGetStarted={handleGetStarted} />
}
