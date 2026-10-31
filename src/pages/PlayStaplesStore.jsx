import React from 'react'
import { useSearchParams } from 'react-router-dom'
import PlayStaplesStoreView from '../components/PlayStaplesStoreView'

export default function PlayStaplesStore() {
  const [searchParams] = useSearchParams()
  const pageParam = searchParams.get('page') || 'home'

  return <PlayStaplesStoreView initialPage={pageParam} isEmbedded={false} />
}
