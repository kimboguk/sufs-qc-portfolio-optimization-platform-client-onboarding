import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboardingStore } from '@/store/onboardingStore'
import { ONBOARDING_QUESTIONS } from '@/utils/constants'
import { Button } from '@/components/common/Button'
import { Select } from '@/components/common/Select'

// OptionButton 컴포넌트
function OptionButton({ label, isSelected, onClick }: { label: string; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full p-5 text-left text-base font-medium rounded-lg border-2 transition-all duration-200 ${
        isSelected
          ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm'
          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  )
}

// MultiSelectButton 컴포넌트
function MultiSelectButton({ label, isSelected, onClick }: { label: string; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full p-5 text-left text-base font-medium rounded-lg border-2 transition-all duration-200 flex items-start ${
        isSelected
          ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm'
          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
      }`}
    >
      <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mr-3 mt-0.5 flex items-center justify-center ${
        isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-400'
      }`}>
        {isSelected && (
          <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        )}
      </div>
      <span className="flex-1">{label}</span>
    </button>
  )
}

export function OnboardingForm() {
  const navigate = useNavigate()
  const { formData, updateFormData, setCurrentStep, submitForm } = useOnboardingStore()
  const currentStep = formData.currentStep || 1
  const totalSteps = 19
  const [error, setError] = useState<string | null>(null)
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  const validateCurrentStep = (): boolean => {
    setError(null)
    
    switch (currentStep) {
      case 1:
        if (!formData.businessField) {
          setError('사업 분야를 선택해주세요.')
          return false
        }
        return true
      case 2:
        if (!formData.assetCount) {
          setError('자산 수를 선택해주세요.')
          return false
        }
        return true
      case 3:
        if (formData.hasDerivatives === undefined || formData.hasDerivatives === null) {
          setError('파생상품 포함 여부를 선택해주세요.')
          return false
        }
        return true
      case 4:
        if (formData.hasDerivatives === true && formData.includeDerivativesInOptimization === undefined) {
          setError('파생상품을 최적화에 포함할지 선택해주세요.')
          return false
        }
        return true
      case 5:
        if (formData.includeTransactionCost === undefined || formData.includeTransactionCost === null) {
          setError('거래 비용 포함 여부를 선택해주세요.')
          return false
        }
        return true
      case 6:
        if (!formData.optimizationPeriod) {
          setError('최적화 수행 기간을 선택해주세요.')
          return false
        }
        return true
      case 7:
        if (!formData.constraints || formData.constraints.length === 0) {
          setError('최소 하나 이상의 제약 조건을 선택해주세요.')
          return false
        }
        return true
      case 8:
        if (formData.hasRegulationConstraints === undefined || formData.hasRegulationConstraints === null) {
          setError('규제 제약 여부를 선택해주세요.')
          return false
        }
        return true
      case 9:
        if (formData.hasRegulationConstraints === true && !formData.regulationDetails) {
          setError('규제 내용을 입력해주세요.')
          return false
        }
        return true
      case 10:
        if (!formData.optimizationFramework) {
          setError('최적화 프레임워크를 선택해주세요.')
          return false
        }
        return true
      case 11:
        if (formData.hasPreferredStrategy === undefined || formData.hasPreferredStrategy === null) {
          setError('포트폴리오 관리 전략 여부를 선택해주세요.')
          return false
        }
        return true
      case 12:
        if (formData.hasPreferredStrategy === true && !formData.preferredStrategy) {
          setError('선호하는 전략을 선택해주세요.')
          return false
        }
        return true
      case 13:
        if (formData.preferredStrategy === '퀸타일 포트폴리오(Quintile)' && !formData.strategyRankingCriteria) {
          setError('순위 산정 기준을 입력해주세요.')
          return false
        }
        return true
      case 14:
        if (formData.addNewAssets === undefined || formData.addNewAssets === null) {
          setError('새로운 자산 추가 여부를 선택해주세요.')
          return false
        }
        return true
      case 15:
        if (formData.addNewAssets === true && !formData.newAssets) {
          setError('추가할 자산을 입력해주세요.')
          return false
        }
        return true
      case 16:
        if (!formData.servicePlan) {
          setError('서비스 플랜을 선택해주세요.')
          return false
        }
        return true
      case 17:
        if (formData.rebalancing === undefined || formData.rebalancing === null) {
          setError('리밸런싱 여부를 선택해주세요.')
          return false
        }
        return true
      case 18:
        if (formData.rebalancing === true && !formData.rebalancingType) {
          setError('리밸런싱 방식을 선택해주세요.')
          return false
        }
        return true
      case 19:
        if (formData.checkPortfolioHealth === undefined || formData.checkPortfolioHealth === null) {
          setError('포트폴리오 건전성 확인 여부를 선택해주세요.')
          return false
        }
        return true
      default:
        return true
    }
  }

  const handleNext = () => {
    if (!validateCurrentStep()) return
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setError(null)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setError(null)
    }
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return
    try {
      await submitForm()
      alert('온보딩이 완료되었습니다!')
      navigate('/')
    } catch (error) {
      setError('온보딩 제출 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  const handleExit = () => {
    setShowExitConfirm(true)
  }

  const confirmExit = () => {
    navigate('/')
  }

  const toggleConstraint = (constraint: string) => {
    const current = formData.constraints || []
    const updated = current.includes(constraint)
      ? current.filter(c => c !== constraint)
      : [...current, constraint]
    updateFormData({ constraints: updated })
  }

  return (
    <div className="flex items-start justify-center bg-white px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">양자 AI 포트폴리오 최적화 플랫폼</h1>
          <p className="text-gray-600">당신의 포트폴리오 최적화를 위한 온보딩</p>
        </div>

        <div className="flex justify-end mb-4">
          <button onClick={handleExit} className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors">✕ 나가기</button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span>Step {currentStep} of {totalSteps}</span>
            <span className="font-semibold">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }} 
            />
          </div>
        </div>

        {/* Question Container */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 mb-8 min-h-[400px]">
          <QuestionRenderer 
            currentStep={currentStep} 
            formData={formData} 
            updateFormData={updateFormData}
            toggleConstraint={toggleConstraint}
          />
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">⚠ {error}</p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex-1"
          >
            이전
          </Button>
          
          {currentStep < totalSteps ? (
            <Button
              variant="primary"
              onClick={handleNext}
              className="flex-1"
            >
              다음
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleSubmit}
              className="flex-1"
            >
              제출하기
            </Button>
          )}
        </div>

        {/* Exit Confirmation Modal */}
        {showExitConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">정말 나가시겠습니까?</h3>
              <p className="text-gray-600 mb-6">진행 중인 내용이 저장되지 않을 수 있습니다.</p>
              <div className="flex gap-4">
                <Button variant="secondary" onClick={() => setShowExitConfirm(false)} className="flex-1">
                  취소
                </Button>
                <Button variant="primary" onClick={confirmExit} className="flex-1">
                  나가기
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Question Renderer Component
function QuestionRenderer({ 
  currentStep, 
  formData, 
  updateFormData,
  toggleConstraint 
}: { 
  currentStep: number
  formData: any
  updateFormData: (data: any) => void
  toggleConstraint: (constraint: string) => void
}) {
  switch (currentStep) {
    case 1:
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.businessField.label}</h2>
          <div className="space-y-3 mb-6">
            {ONBOARDING_QUESTIONS.businessField.options.map((option) => (
              <OptionButton
                key={option.value}
                label={option.label}
                isSelected={formData.businessField === option.value}
                onClick={() => updateFormData({ businessField: option.value })}
              />
            ))}
          </div>
          
          {formData.businessField && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">세부 분야를 선택해주세요</label>
              <Select
                value={formData.businessSubfield || ''}
                onChange={(e) => updateFormData({ businessSubfield: e.target.value })}
                options={
                  ONBOARDING_QUESTIONS.businessField.options
                    .find(opt => opt.value === formData.businessField)
                    ?.subcategories.map(sub => ({ value: sub, label: sub })) || []
                }
                placeholder="세부 분야 선택"
              />
            </div>
          )}
        </div>
      )
    
    case 2:
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.assetCount.label}</h2>
          <div className="space-y-3">
            {ONBOARDING_QUESTIONS.assetCount.options.map((option) => (
              <OptionButton
                key={option}
                label={option}
                isSelected={formData.assetCount === option}
                onClick={() => updateFormData({ assetCount: option })}
              />
            ))}
          </div>
        </div>
      )
    
    case 3:
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.hasDerivatives.label}</h2>
          <div className="space-y-3">
            {['예', '아니요'].map((option) => (
              <OptionButton
                key={option}
                label={option}
                isSelected={formData.hasDerivatives === (option === '예')}
                onClick={() => updateFormData({ hasDerivatives: option === '예' })}
              />
            ))}
          </div>
        </div>
      )
    
    case 4:
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.includeDerivatives.label}</h2>
          <div className="space-y-3">
            {['예', '아니요'].map((option) => (
              <OptionButton
                key={option}
                label={option}
                isSelected={formData.includeDerivativesInOptimization === (option === '예')}
                onClick={() => updateFormData({ includeDerivativesInOptimization: option === '예' })}
              />
            ))}
          </div>
        </div>
      )
    
    case 5:
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.includeTransactionCost.label}</h2>
          <div className="space-y-3">
            {['예', '아니요'].map((option) => (
              <OptionButton
                key={option}
                label={option}
                isSelected={formData.includeTransactionCost === (option === '예')}
                onClick={() => updateFormData({ includeTransactionCost: option === '예' })}
              />
            ))}
          </div>
        </div>
      )
    
    case 6:
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.optimizationPeriod.label}</h2>
          <div className="space-y-3">
            {ONBOARDING_QUESTIONS.optimizationPeriod.options.map((option) => (
              <OptionButton
                key={option}
                label={option}
                isSelected={formData.optimizationPeriod === option}
                onClick={() => updateFormData({ optimizationPeriod: option })}
              />
            ))}
          </div>
        </div>
      )
    
    case 7:
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.constraints.label}</h2>
          <div className="space-y-3">
            {ONBOARDING_QUESTIONS.constraints.options.map((option) => (
              <MultiSelectButton
                key={option}
                label={option}
                isSelected={formData.constraints?.includes(option) || false}
                onClick={() => toggleConstraint(option)}
              />
            ))}
          </div>
        </div>
      )
    
    case 8:
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.hasRegulationConstraints.label}</h2>
          <div className="space-y-3">
            {['예', '아니요'].map((option) => (
              <OptionButton
                key={option}
                label={option}
                isSelected={formData.hasRegulationConstraints === (option === '예')}
                onClick={() => updateFormData({ hasRegulationConstraints: option === '예' })}
              />
            ))}
          </div>
        </div>
      )
    
    case 9:
      // Step 9: 규제 내용 입력 (hasRegulationConstraints === true일 때만)
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.regulationDetails.label}</h2>
          <textarea 
            value={formData.regulationDetails || ''} 
            onChange={(e) => updateFormData({ regulationDetails: e.target.value })} 
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
            rows={5} 
            placeholder="규제 내용을 자세히 입력해주세요" 
          />
        </div>
      )
    
    case 10:
      // Step 10: 최적화 프레임워크 선택
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.optimizationFramework.label}</h2>
          <div className="space-y-3">
            {ONBOARDING_QUESTIONS.optimizationFramework.options.map((option) => (
              <OptionButton
                key={option}
                label={option}
                isSelected={formData.optimizationFramework === option}
                onClick={() => updateFormData({ optimizationFramework: option })}
              />
            ))}
          </div>
        </div>
      )
    
    case 11:
      // Step 11: 선호하는 포트폴리오 관리 전략 여부
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.hasPreferredStrategy.label}</h2>
          <div className="space-y-3">
            {['예', '아니요'].map((option) => (
              <OptionButton
                key={option}
                label={option}
                isSelected={formData.hasPreferredStrategy === (option === '예')}
                onClick={() => updateFormData({ hasPreferredStrategy: option === '예' })}
              />
            ))}
          </div>
        </div>
      )
    
    case 12:
      // Step 12: 선호 전략 선택 (hasPreferredStrategy === true일 때만)
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.preferredStrategy.label}</h2>
          <div className="space-y-3">
            {ONBOARDING_QUESTIONS.preferredStrategy.options.map((option) => (
              <OptionButton
                key={option}
                label={option}
                isSelected={formData.preferredStrategy === option}
                onClick={() => updateFormData({ preferredStrategy: option })}
              />
            ))}
          </div>
        </div>
      )
    
    case 13:
      // Step 13: 순위 산정 기준 입력 (퀸타일 포트폴리오 선택 시만)
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.strategyRankingCriteria.label}</h2>
          <input 
            type="text" 
            value={formData.strategyRankingCriteria || ''} 
            onChange={(e) => updateFormData({ strategyRankingCriteria: e.target.value })} 
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
            placeholder="순위 산정 기준을 입력해주세요" 
          />
        </div>
      )
    
    case 14:
      // Step 14: 새로운 자산 추가 여부
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.addNewAssets.label}</h2>
          <div className="space-y-3">
            {['예', '아니요'].map((option) => (
              <OptionButton
                key={option}
                label={option}
                isSelected={formData.addNewAssets === (option === '예')}
                onClick={() => updateFormData({ addNewAssets: option === '예' })}
              />
            ))}
          </div>
        </div>
      )
    
    case 15:
      // Step 15: 추가할 자산 입력 (addNewAssets === true일 때만)
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.newAssets.label}</h2>
          <textarea 
            value={formData.newAssets || ''} 
            onChange={(e) => updateFormData({ newAssets: e.target.value })} 
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
            rows={5} 
            placeholder="추가할 자산을 입력해주세요 (쉼표로 구분)" 
          />
        </div>
      )
    
    case 16:
      // Step 16: 서비스 플랜 선택
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.servicePlan.label}</h2>
          <div className="space-y-3">
            {ONBOARDING_QUESTIONS.servicePlan.options.map((option) => (
              <OptionButton
                key={option}
                label={option}
                isSelected={formData.servicePlan === option}
                onClick={() => updateFormData({ servicePlan: option })}
              />
            ))}
          </div>
        </div>
      )
    
    case 17:
      // Step 17: 리밸런싱 여부
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.rebalancing.label}</h2>
          <div className="space-y-3">
            {['예', '아니요'].map((option) => (
              <OptionButton
                key={option}
                label={option}
                isSelected={formData.rebalancing === (option === '예')}
                onClick={() => updateFormData({ rebalancing: option === '예' })}
              />
            ))}
          </div>
        </div>
      )
    
    case 18:
      // Step 18: 리밸런싱 방식 선택 (rebalancing === true일 때만)
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.rebalancingType.label}</h2>
          <div className="space-y-3">
            {ONBOARDING_QUESTIONS.rebalancingType.options.map((option) => (
              <OptionButton
                key={option}
                label={option}
                isSelected={formData.rebalancingType === option}
                onClick={() => updateFormData({ rebalancingType: option })}
              />
            ))}
          </div>
        </div>
      )
    
    case 19:
      // Step 19: 포트폴리오 건전성 확인
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.checkPortfolioHealth.label}</h2>
          <div className="space-y-3">
            {['예', '아니요'].map((option) => (
              <OptionButton
                key={option}
                label={option}
                isSelected={formData.checkPortfolioHealth === (option === '예')}
                onClick={() => updateFormData({ checkPortfolioHealth: option === '예' })}
              />
            ))}
          </div>
        </div>
      )
    
    default:
      return (
        <div className="text-center text-gray-500">
          <p>이 질문은 아직 구현되지 않았습니다.</p>
        </div>
      )
  }
}
