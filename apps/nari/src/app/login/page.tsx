'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { LuSparkles } from 'react-icons/lu'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth()
  const router = useRouter()
  const [signingIn, setSigningIn] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [user, loading, router])

  const handleSignIn = async () => {
    setError(null)
    setSigningIn(true)
    try {
      await signInWithGoogle()
      router.replace('/dashboard')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign-in failed. Please try again.'
      setError(message)
    } finally {
      setSigningIn(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-5">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="text-4xl font-bold text-primary tracking-tight">Shakti</span>
          <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary/70 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full uppercase tracking-wider">
            <LuSparkles className="w-3.5 h-3.5" />
            AI-Powered Economic Empowerment
          </div>
        </div>

        {/* Card */}
        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-lg p-8">
          <h1 className="text-2xl font-bold text-base-content mb-1">Welcome back</h1>
          <p className="text-base-content/60 text-sm mb-8">
            Sign in to continue your journey
          </p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleSignIn}
            disabled={signingIn}
            className="flex items-center justify-center gap-3 w-full border border-base-300 bg-base-100 hover:bg-base-200 text-base-content font-medium py-3 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {signingIn ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <FcGoogle className="w-5 h-5 shrink-0" />
            )}
            {signingIn ? 'Signing in…' : 'Continue with Google'}
          </button>

          <p className="mt-6 text-center text-xs text-base-content/40 leading-relaxed">
            By continuing, you agree to Shakti&apos;s{' '}
            <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>
            {' '}and{' '}
            <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-base-content/50">
          New here?{' '}
          <button
            onClick={handleSignIn}
            className="text-primary font-medium hover:underline"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  )
}
