import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CV() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/#cv', { replace: true })
  }, [navigate])

  return null
}
