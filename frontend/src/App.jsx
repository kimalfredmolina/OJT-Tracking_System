import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import LoginPage from './authentication/LoginPage'
import HomePage from './pages/HomePage'

const App = () => {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setChecking(false)
    })
    return () => unsubscribe()
  }, [])

  if (checking) return null

  return user ? <HomePage /> : <LoginPage />
}

export default App