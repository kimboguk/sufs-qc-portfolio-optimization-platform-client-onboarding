// src/store/onboardingStore.ts

import { create } from 'zustand'
import { OnboardingData, OnboardingStatus } from '@/types/onboarding'

interface OnboardingStore {
  formData: OnboardingData
  status: OnboardingStatus
  
  // ì•¡ì…˜
  updateFormData: (data: Partial<OnboardingData>) => void
  setCurrentStep: (step: number) => void
  resetForm: () => void
  submitForm: () => Promise<void>
}

const initialFormData: OnboardingData = {
  currentStep: 1
}

const initialStatus: OnboardingStatus = {
  status: 'pending',
  completedSteps: 0,
  totalSteps: 13,
  lastUpdated: new Date().toISOString()
}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  formData: initialFormData,
  status: initialStatus,

  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data, updatedAt: new Date().toISOString() }
    })),

  setCurrentStep: (step) =>
    set((state) => ({
      formData: { ...state.formData, currentStep: step }
    })),

  resetForm: () =>
    set({
      formData: initialFormData,
      status: initialStatus
    }),

  submitForm: async () => {
    const { formData } = get()
    set((state) => ({ status: { ...state.status, status: 'in-progress' } }))
    
    try {
      // ë°±ì—”ë“œ í˜¸ì¶œ (ë‚˜ì¤‘ì— êµ¬í˜„)
      // await onboardingAPI.submit(formData)
      
      set((state) => ({
        status: {
          ...state.status,
          status: 'completed',
          completedSteps: state.status.totalSteps,
          lastUpdated: new Date().toISOString()
        }
      }))
    } catch (error) {
      set((state) => ({ status: { ...state.status, status: 'error' } }))
      throw error
    }
  }
}))