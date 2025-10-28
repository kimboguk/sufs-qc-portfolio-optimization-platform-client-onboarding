import axios from 'axios'
import { OnboardingData } from '@/types/onboarding'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const onboardingAPI = {
  submit: async (data: OnboardingData) => {
    const response = await axios.post(`${API_URL}/api/onboarding/submit`, data)
    return response.data
  },

  getStatus: async (userId: string) => {
    const response = await axios.get(`${API_URL}/api/onboarding/status/${userId}`)
    return response.data
  }
}