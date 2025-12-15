import api from './api'

// Get all events
export const getEvents = async () => {
  const apiResponse = await api.get('/events')
  const response = apiResponse.data // Unwrap backend response
  return response.data || []
}

// Create event (admin only)
export const createEvent = async (eventData) => {
  const apiResponse = await api.post('/events', eventData)
  return apiResponse.data // Unwrap backend response
}

// Update event (admin only)
export const updateEvent = async (id, eventData) => {
  const apiResponse = await api.put(`/events/${id}`, eventData)
  return apiResponse.data // Unwrap backend response
}

// Delete event (admin only)
export const deleteEvent = async (id) => {
  const apiResponse = await api.delete(`/events/${id}`)
  return apiResponse.data // Unwrap backend response
}

