import { notFound } from 'next/navigation'
import { CourseDetailClient } from './CourseDetailClient'
import { getCourseById, getELearningData } from '@/lib/elearning-store'

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = getCourseById(id)
  if (!course) notFound()
  const { userProgress } = getELearningData()
  const progress = userProgress?.find((p) => p.courseId === id) ?? null
  return <CourseDetailClient course={course} progress={progress} />
}
