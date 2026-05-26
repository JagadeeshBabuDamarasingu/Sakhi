import { NextResponse } from 'next/server'
import { getELearningData } from '@/lib/elearning-store'

export async function GET() {
  return NextResponse.json(getELearningData())
}
