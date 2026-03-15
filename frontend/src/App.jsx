import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import LoginPage from './authentication/LoginPage'
import HomePage from './pages/HomePage'

const App = () => {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setChecking(false)
    })
    return () => unsubscribe()
  }, [])

  if (checking) return null

  return user
    ? <HomePage isDark={isDark} toggleTheme={toggleTheme} />
    : <LoginPage isDark={isDark} toggleTheme={toggleTheme} />
}

export default App