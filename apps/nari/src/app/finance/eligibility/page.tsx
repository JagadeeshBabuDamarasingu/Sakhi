import { EligibilityClient } from './EligibilityClient'
import { checkFinancingEligibility } from '@/lib/financing-store'

export default async function EligibilityPage() {
  const eligibility = checkFinancingEligibility()
  return <EligibilityClient eligibility={eligibility} />
}
