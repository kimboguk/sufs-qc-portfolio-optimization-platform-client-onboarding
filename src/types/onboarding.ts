// src/types/onboarding.ts

export interface BusinessField {
  category: 'finance' | 'marketing'
  subcategories: string[]
}

export interface OnboardingData {
  // Question 1: 사업 분야
  businessField?: 'finance' | 'marketing'
  businessSubfield?: string

  // Question 2: 자산 수
  assetCount?: string

  // Question 3-4: 파생상품
  hasDerivatives?: boolean
  includeDerivativesInOptimization?: boolean

  // Question 5: 거래 비용
  includeTransactionCost?: boolean

  // Question 6: 최적화 수행 기간
  optimizationPeriod?: 'single' | 'multiple'

  // Question 7: 제약 조건 (복수선택)
  constraints?: string[]

  // Question 8: 규제 제약
  hasRegulationConstraints?: boolean
  regulationDetails?: string

  // Question 9: 최적화 프레임워크
  optimizationFramework?: string

  // Question 10: 포트폴리오 관리 전략
  hasPreferredStrategy?: boolean
  preferredStrategy?: string
  strategyRankingCriteria?: string

  // Question 11: 신규 자산 추가
  addNewAssets?: boolean
  newAssets?: string

  // Question 12: 서비스 플랜
  servicePlan?: string

  // Question 13: 리밸런싱
  rebalancing?: boolean
  rebalancingType?: 'auto' | 'manual' | 'semi-auto'

  // Question 14: 포트폴리오 건전성 확인
  checkPortfolioHealth?: boolean

  // Question 15: 요금 방식
  pricingModel?: string

  // Question 16-19: 시스템 프로세스
  dataSubmitted?: boolean
  optimizationStarted?: boolean
  resultsReceived?: boolean
  rebalancingStarted?: boolean

  // 메타데이터
  createdAt?: string
  updatedAt?: string
  currentStep?: number
}

// 진행 상태
export type OnboardingStep = 
  | 'pending' 
  | 'in-progress' 
  | 'completed' 
  | 'error'

export interface OnboardingStatus {
  status: OnboardingStep
  completedSteps: number
  totalSteps: number
  lastUpdated: string
}