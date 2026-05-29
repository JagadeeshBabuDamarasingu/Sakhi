import { MandateClient } from './MandateClient'

interface MandateInfo {
  loanId: string
  active: boolean
  debitDay: number
  upiId: string
  mandateRef: string | null
}

async function getMandate(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/financing/loans/${id}/mandate`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Mandate not found')
  return res.json() as Promise<MandateInfo>
}

export default async function MandatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const mandate = await getMandate(id)
  return <MandateClient mandate={mandate} />
}
