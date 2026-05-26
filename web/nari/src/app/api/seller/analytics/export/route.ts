import { getAnalyticsCsv } from '@/lib/marketplace-store'

export async function GET() {
  return new Response(getAnalyticsCsv(), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="seller-analytics.csv"',
    },
  })
}
