import { EligibilityClient } from './EligibilityClient'

async function getEligibility() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/financing/eligibility`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to check eligibility')
  return res.json() as Promise<{
    eligible: boolean
    creditLimit: number
    consentRequired: boolean
    message: string
  }>
}

export default async function EligibilityPage() {
  const eligibility = await getEligibility()
  return <EligibilityClient eligibility={eligibility} />
}
