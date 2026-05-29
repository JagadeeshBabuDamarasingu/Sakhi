import { CoursePlayerClient } from './CoursePlayerClient'
import { getCourseById, getELearningData } from '@/lib/elearning-store'
import { notFound } from 'next/navigation'

export default async function CoursePlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = getCourseById(id)
  if (!course) notFound()
  const { userProgress } = getELearningData()
  const progress = userProgress?.find((p) => p.courseId === id) ?? null
  return <CoursePlayerClient course={course} initialProgress={progress} />
}
