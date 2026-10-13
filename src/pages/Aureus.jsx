import React from 'react'
import { useNavigate } from 'react-router-dom'
import AureusCaseStudyModal from '../components/AureusCaseStudyModal'

export default function AureusPage() {
  const navigate = useNavigate()

  return (
    <AureusCaseStudyModal
      onClose={() => navigate('/#work')}
    />
  )
}
