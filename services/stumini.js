import api from './api'

// Get all approved stumini
export const getStumini = async () => {
  const apiResponse = await api.get('/alumni')
  const response = apiResponse.data // Unwrap backend response
  return response.data || []
}

export const getStuminiStats = async () => {
  const apiResponse = await api.get('/alumni/stats')
  const response = apiResponse.data
  return response.data || { networkConnections: 0, profileViews: 0, savedJobs: 0 }
}

// Get pending stumini (admin only)
export const getPendingStumini = async () => {
  const apiResponse = await api.get('/alumni/pending')
  const response = apiResponse.data // Unwrap backend response
  return response.data || []
}

// Approve stumini (admin only)
export const approveStumini = async (id) => {
  const apiResponse = await api.put(`/alumni/approve/${id}`, {})
  return apiResponse.data // Unwrap backend response
}

// Reject stumini (admin only)
export const rejectStumini = async (id) => {
  const apiResponse = await api.put(`/alumni/reject/${id}`, {})
  return apiResponse.data // Unwrap backend response
}

// Update stumini (admin only)
export const updateStumini = async (id, data) => {
  const apiResponse = await api.put(`/alumni/${id}`, data)
  return apiResponse.data // Unwrap backend response
}

// Delete stumini (admin only)
export const deleteStumini = async (id) => {
  const apiResponse = await api.delete(`/alumni/${id}`)
  return apiResponse.data // Unwrap backend response
}
