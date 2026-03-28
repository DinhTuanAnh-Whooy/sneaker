import { createContext, useContext, useReducer, useEffect } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'sneaker-auth'

function loadAuth() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      return { user: data.user, isAuthenticated: true }
    }
  } catch {}
  return { user: null, isAuthenticated: false }
}

function saveAuth(state) {
  if (state.isAuthenticated && state.user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: state.user }))
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

function authReducer(state, action) {
  let newState
  switch (action.type) {
    case 'LOGIN':
      newState = { user: action.payload, isAuthenticated: true }
      break
    case 'LOGOUT':
      newState = { user: null, isAuthenticated: false }
      break
    case 'UPDATE_PROFILE':
      newState = {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      }
      break
    default:
      return state
  }
  saveAuth(newState)
  return newState
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, null, loadAuth)

  const login = (user) => dispatch({ type: 'LOGIN', payload: user })
  const logout = () => dispatch({ type: 'LOGOUT' })
  const updateProfile = (data) => dispatch({ type: 'UPDATE_PROFILE', payload: data })

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
