import { CloseLoanClient } from './CloseLoanClient'
import { getLoan } from '@/lib/financing-store'
import { notFound } from 'next/navigation'

export default async function CloseLoanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const loan = getLoan(id)
  if (!loan) notFound()
  return <CloseLoanClient loan={loan} />
}
