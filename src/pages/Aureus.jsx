import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectCaseStudyModal from '../components/ProjectCaseStudyModal'
import { projectsData } from '../components/ContentsSection'

export default function AureusPage() {
  const navigate = useNavigate()
  const aureusProject = projectsData.find((p) => p.id === 'aureaus') || projectsData[2]

  return (
    <ProjectCaseStudyModal
      project={aureusProject}
      onClose={() => navigate('/#work')}
      allProjects={projectsData}
      onSelectProject={(p) => {
        if (p.id !== 'aureaus') navigate('/#work')
      }}
    />
  )
}
