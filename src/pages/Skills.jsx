import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Skills() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/#skills', { replace: true })
  }, [navigate])

  return null
}
