import api from './api'

// Get all announcements
export const getAnnouncements = async () => {
  const apiResponse = await api.get('/announcements')
  const response = apiResponse.data // Unwrap backend response
  return response.data || []
}

// Create announcement (admin only)
export const createAnnouncement = async (announcementData) => {
  const apiResponse = await api.post('/announcements', announcementData)
  return apiResponse.data // Unwrap backend response
}

// Update announcement (admin only)
export const updateAnnouncement = async (id, announcementData) => {
  const apiResponse = await api.put(`/announcements/${id}`, announcementData)
  return apiResponse.data // Unwrap backend response
}

// Delete announcement (admin only)
export const deleteAnnouncement = async (id) => {
  const apiResponse = await api.delete(`/announcements/${id}`)
  return apiResponse.data // Unwrap backend response
}

