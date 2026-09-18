import { useParams } from 'react-router-dom'
import { ProjectDetail } from '../components/projects/ProjectDetail.tsx'
import { useProjects } from '../hooks/useProjects.ts'
import NotFound from './NotFound.tsx'

export default function ProjectDetails() {
  const { projectId } = useParams()
  const { getProjectById } = useProjects()
  const project = getProjectById(projectId)

  if (!project) {
    return <NotFound />
  }

  return (
    <main id="main-content">
      <ProjectDetail project={project} />
    </main>
  )
}
