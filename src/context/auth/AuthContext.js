import { useContext, useState, createContext, useEffect } from 'react'
import { get } from 'axios'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [isLoading, setLoading] = useState(true) // Show loading component until request is resolved

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await get('/api/profile', { withCredentials: true })

        setAuthenticated(true)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider')
  }

  return context
}
