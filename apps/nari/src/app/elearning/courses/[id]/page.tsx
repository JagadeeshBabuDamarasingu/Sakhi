import { notFound } from 'next/navigation'
import { CourseDetailClient } from './CourseDetailClient'
import type { Course, UserProgress } from '@/components/elearning/types'

async function getCourseData(id: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
  const [courseRes, elearningRes] = await Promise.all([
    fetch(`${base}/api/courses/${id}`, { cache: 'no-store' }),
    fetch(`${base}/api/elearning`, { cache: 'no-store' }),
  ])
  if (!courseRes.ok) notFound()
  const course: Course = await courseRes.json()
  const elearning = await elearningRes.json()
  const progress: UserProgress | null =
    elearning.userProgress?.find((p: UserProgress) => p.courseId === id) ?? null
  return { course, progress }
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { course, progress } = await getCourseData(id)
  return <CourseDetailClient course={course} progress={progress} />
}
