import { useEffect, useState, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useAuthStatus = () => {
  const [loggedIn, setLogedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  const isMounted = useRef(true)

  useEffect(() => {
    if (!isMounted) return

    const auth = getAuth()
    onAuthStateChanged(auth, user => {
      if (user) setLogedIn(true)

      setCheckingStatus(false)
    })

    return () => isMounted.current = false
  }, [isMounted])

  return { loggedIn, checkingStatus }
}