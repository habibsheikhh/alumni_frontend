import api from './api'

// Signup
export const signup = async (userData) => {
  // api.post returns { data: { success, message, data } }
  const apiResponse = await api.post('/auth/signup', userData)
  return apiResponse.data // Unwrap the backend response
}

// Login
export const login = async (email, password) => {
  // api.post returns { data: { success, message, data: { token, ... } } }
  const apiResponse = await api.post('/auth/login', { email, password })
  const response = apiResponse.data // Unwrap the backend response
  
  // Store token and user data
  // Backend returns { success, message, data: { token, ...userInfo } }
  if (response.success && response.data && response.data.token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
    }
  }
  
  return response
}

// Logout
export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

// Get current user from localStorage
export const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch (e) {
        return null
      }
    }
  }
  return null
}

// Check if user is authenticated
export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('token')
  }
  return false
}

// Get auth token
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token')
  }
  return null
}

