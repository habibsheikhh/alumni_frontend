import api from './api'

// Get all approved alumni
export const getAlumni = async () => {
  const apiResponse = await api.get('/alumni')
  const response = apiResponse.data // Unwrap backend response
  return response.data || []
}

export const getAlumniStats = async () => {
  const apiResponse = await api.get('/alumni/stats')
  const response = apiResponse.data
  return response.data || { networkConnections: 0, profileViews: 0, savedJobs: 0 }
}

// Get pending alumni (admin only)
export const getPendingAlumni = async () => {
  const apiResponse = await api.get('/alumni/pending')
  const response = apiResponse.data // Unwrap backend response
  return response.data || []
}

// Approve alumni (admin only)
export const approveAlumni = async (id) => {
  const apiResponse = await api.put(`/alumni/approve/${id}`, {})
  return apiResponse.data // Unwrap backend response
}

// Reject alumni (admin only)
export const rejectAlumni = async (id) => {
  const apiResponse = await api.put(`/alumni/reject/${id}`, {})
  return apiResponse.data // Unwrap backend response
}

// Update alumni (admin only)
export const updateAlumni = async (id, data) => {
  const apiResponse = await api.put(`/alumni/${id}`, data)
  return apiResponse.data // Unwrap backend response
}

// Delete alumni (admin only)
export const deleteAlumni = async (id) => {
  const apiResponse = await api.delete(`/alumni/${id}`)
  return apiResponse.data // Unwrap backend response
}

