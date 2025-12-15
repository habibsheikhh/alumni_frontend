// API Base URL - uses NEXT_PUBLIC_API_BASE_URL at build time when available
const API_BASE_URL = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_BASE_URL
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : 'http://localhost:4000'

// Get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token')
  }
  return null
}

// Fetch with authentication
const fetchWithAuth = async (url, options = {}) => {
  const token = getAuthToken()

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  // Axios-style response
  return { data }
}

// GET request
export const get = async (url) => {
  return fetchWithAuth(url, { method: 'GET' })
}

// POST request
export const post = async (url, body) => {
  return fetchWithAuth(url, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

// PUT request
export const put = async (url, body) => {
  return fetchWithAuth(url, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

// DELETE request
export const del = async (url) => {
  return fetchWithAuth(url, { method: 'DELETE' })
}

export default {
  get,
  post,
  put,
  delete: del,
}
