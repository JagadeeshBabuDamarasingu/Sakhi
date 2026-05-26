import { NextResponse } from 'next/server'
import { getCertificates } from '@/lib/elearning-store'

export async function GET() {
  return NextResponse.json(getCertificates())
}
