import api from './api'

// Get all jobs
export const getJobs = async () => {
  const apiResponse = await api.get('/jobs')
  const response = apiResponse.data // Unwrap backend response
  return response.data || []
}

// Create job (admin only)
export const createJob = async (jobData) => {
  const apiResponse = await api.post('/jobs', jobData)
  return apiResponse.data // Unwrap backend response
}

// Update job (admin only)
export const updateJob = async (id, jobData) => {
  const apiResponse = await api.put(`/jobs/${id}`, jobData)
  return apiResponse.data // Unwrap backend response
}

// Delete job (admin only)
export const deleteJob = async (id) => {
  const apiResponse = await api.delete(`/jobs/${id}`)
  return apiResponse.data // Unwrap backend response
}

