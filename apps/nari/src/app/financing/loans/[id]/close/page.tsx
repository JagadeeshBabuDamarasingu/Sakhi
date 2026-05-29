import { CloseLoanClient } from './CloseLoanClient'
import type { Loan } from '@/components/financing/types'

async function getLoan(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/financing/loans/${id}`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Loan not found')
  return res.json() as Promise<Loan>
}

export default async function CloseLoanPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const loan = await getLoan(id)
  return <CloseLoanClient loan={loan} />
}
