import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Sketchbook() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/#sketchbook', { replace: true })
  }, [navigate])

  return null
}
