import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Work() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/#work', { replace: true })
  }, [navigate])

  return null
}
