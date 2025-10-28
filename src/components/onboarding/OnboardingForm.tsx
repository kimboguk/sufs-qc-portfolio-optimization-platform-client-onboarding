import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboardingStore } from '@/store/onboardingStore'
import { ONBOARDING_QUESTIONS } from '@/utils/constants'
import { Button } from '@/components/common/Button'

export function OnboardingForm() {
  const navigate = useNavigate()
  const { formData, updateFormData, setCurrentStep, submitForm } = useOnboardingStore()
  const currentStep = formData.currentStep || 1
  const totalSteps = 13  // 19 → 13 단계로 축소
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
        // 파생상품 있으면 최적화 포함 여부도 체크
        if (formData.hasDerivatives === true) {
          if (formData.includeDerivativesInOptimization === undefined || formData.includeDerivativesInOptimization === null) {
            setError('파생상품을 최적화에 포함할지 선택해주세요.')
            return false
          }
        }
        return true
      
      case 4:
        if (formData.includeTransactionCost === undefined || formData.includeTransactionCost === null) {
          setError('거래 비용 포함 여부를 선택해주세요.')
          return false
        }
        return true
      
      case 5:
        if (!formData.optimizationPeriod) {
          setError('최적화 수행 기간을 선택해주세요.')
          return false
        }
        return true
      
      case 6:
        if (!formData.constraints || formData.constraints.length === 0) {
          setError('최소 하나 이상의 제약 조건을 선택해주세요.')
          return false
        }
        return true
      
      case 7:
        if (formData.hasRegulationConstraints === undefined || formData.hasRegulationConstraints === null) {
          setError('규제 제약 여부를 선택해주세요.')
          return false
        }
        // 규제 있으면 규제 내용도 체크
        if (formData.hasRegulationConstraints === true) {
          if (!formData.regulationDetails || formData.regulationDetails.trim() === '') {
            setError('규제 내용을 입력해주세요.')
            return false
          }
        }
        return true
      
      case 8:
        if (!formData.optimizationFramework) {
          setError('최적화 프레임워크를 선택해주세요.')
          return false
        }
        return true
      
      case 9:
        if (formData.hasPreferredStrategy === undefined || formData.hasPreferredStrategy === null) {
          setError('포트폴리오 관리 전략 여부를 선택해주세요.')
          return false
        }
        // 전략 있으면 전략 선택도 체크
        if (formData.hasPreferredStrategy === true) {
          if (!formData.preferredStrategy) {
            setError('선호하는 전략을 선택해주세요.')
            return false
          }
          // 퀸타일이면 순위 기준도 체크
          if (formData.preferredStrategy === '퀸타일 포트폴리오(Quintile)') {
            if (!formData.strategyRankingCriteria || formData.strategyRankingCriteria.trim() === '') {
              setError('순위 산정 기준을 입력해주세요.')
              return false
            }
          }
        }
        return true
      
      case 10:
        if (formData.addNewAssets === undefined || formData.addNewAssets === null) {
          setError('새로운 자산 추가 여부를 선택해주세요.')
          return false
        }
        // 자산 추가하면 자산 목록도 체크
        if (formData.addNewAssets === true) {
          if (!formData.newAssets || formData.newAssets.trim() === '') {
            setError('추가할 자산을 입력해주세요.')
            return false
          }
        }
        return true
      
      case 11:
        if (!formData.servicePlan) {
          setError('서비스 플랜을 선택해주세요.')
          return false
        }
        return true
      
      case 12:
        if (formData.rebalancing === undefined || formData.rebalancing === null) {
          setError('리밸런싱 여부를 선택해주세요.')
          return false
        }
        // 리밸런싱하면 방식도 체크
        if (formData.rebalancing === true) {
          if (!formData.rebalancingType) {
            setError('리밸런싱 방식을 선택해주세요.')
            return false
          }
        }
        return true
      
      case 13:
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

  return (
    <div className="flex items-start justify-center bg-white px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">양자 AI 포트폴리오 최적화 플랫폼</h1>
          <p className="text-gray-600">당신의 포트폴리오 최적화를 위한 온보딩</p>
        </div>

        <div className="flex justify-end mb-4">
          <button onClick={handleExit} className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors">✕ 나가기</button>
        </div>

        <div className="mb-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span>Step {currentStep} of {totalSteps}</span>
            <span className="font-semibold">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 mb-8 min-h-96 max-h-[600px] overflow-y-auto">
          <QuestionRenderer currentStep={currentStep} formData={formData} updateFormData={updateFormData} />
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">⚠ {error}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between gap-4">
          <Button variant="outline" size="lg" onClick={handlePrevious} disabled={currentStep === 1} className="px-8 py-4 text-lg">← 이전</Button>
          <div className="flex-1" />
          {currentStep < totalSteps ? (
            <Button variant="primary" size="lg" onClick={handleNext} className="px-8 py-4 text-lg">다음 →</Button>
          ) : (
            <Button variant="primary" size="lg" onClick={handleSubmit} className="px-8 py-4 text-lg">완료 ✓</Button>
          )}
        </div>

        {showExitConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">온보딩을 나가시겠습니까?</h3>
              <p className="text-gray-600 mb-6">지금까지 작성한 내용은 저장되지 않습니다.</p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowExitConfirm(false)}>계속하기</Button>
                <Button variant="primary" onClick={confirmExit}>나가기</Button>
              </div>
            </div>
          </div>
        )}

        {/* 저작권 표기 */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© SUFS 2025, All Rights Reserved.</p>
        </div>
      </div>
    </div>
  )
}

// 버튼 옵션 컴포넌트
function OptionButton({ label, isSelected, onClick }: { label: string; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-6 text-left border-2 rounded-lg transition-all font-medium text-lg ${
        isSelected
          ? 'border-blue-600 bg-blue-50 text-blue-900'
          : 'border-gray-200 bg-white text-gray-900 hover:border-blue-400 hover:bg-blue-50'
      }`}
    >
      {label}
    </button>
  )
}

// 체크박스 옵션 컴포넌트
function CheckboxOption({ label, isSelected, onChange }: { label: string; isSelected: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!isSelected)}
      className={`w-full p-6 text-left border-2 rounded-lg transition-all font-medium text-lg flex items-center ${
        isSelected
          ? 'border-blue-600 bg-blue-50 text-blue-900'
          : 'border-gray-200 bg-white text-gray-900 hover:border-blue-400 hover:bg-blue-50'
      }`}
    >
      <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>
        {isSelected && <span className="text-white text-sm">✓</span>}
      </div>
      {label}
    </button>
  )
}

function QuestionRenderer({ currentStep, formData, updateFormData }: any) {
  switch (currentStep) {
    // Step 1: 사업 분야
    case 1:
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.businessField.label}</h2>
          <div className="space-y-3">
            {ONBOARDING_QUESTIONS.businessField.options.map((option) => (
              <OptionButton
                key={option.value}
                label={option.label}
                isSelected={formData.businessField === option.value}
                onClick={() => updateFormData({ businessField: option.value })}
              />
            ))}
          </div>
        </div>
      )

    // Step 2: 자산 수
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

    // Step 3: 파생상품 포함 여부 + (예 → 최적화 포함 여부)
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

          {/* 조건부: 파생상품 있으면 최적화 포함 여부 */}
          {formData.hasDerivatives === true && (
            <div className="mt-8 pt-8 border-t-2 border-gray-200">
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
          )}
        </div>
      )

    // Step 4: 거래 비용 포함
    case 4:
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

    // Step 5: 최적화 수행 기간
    case 5:
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.optimizationPeriod.label}</h2>
          <div className="space-y-3">
            {ONBOARDING_QUESTIONS.optimizationPeriod.options.map((option) => (
              <OptionButton
                key={option}
                label={option}
                isSelected={formData.optimizationPeriod === (option === '단일 기간' ? 'single' : 'multiple')}
                onClick={() => updateFormData({ optimizationPeriod: option === '단일 기간' ? 'single' : 'multiple' })}
              />
            ))}
          </div>
        </div>
      )

    // Step 6: 제약 조건
    case 6:
      return (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.constraints.label}</h2>
          <div className="space-y-3">
            {ONBOARDING_QUESTIONS.constraints.options.map((option) => (
              <CheckboxOption
                key={option}
                label={option}
                isSelected={formData.constraints?.includes(option) || false}
                onChange={(checked) => {
                  const current = formData.constraints || []
                  const newConstraints = checked ? [...current, option] : current.filter((c: string) => c !== option)
                  updateFormData({ constraints: newConstraints })
                }}
              />
            ))}
          </div>
        </div>
      )

    // Step 7: 규제 제약 여부 + (예 → 규제 내용 입력)
    case 7:
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

          {/* 조건부: 규제 있으면 규제 내용 입력 */}
          {formData.hasRegulationConstraints === true && (
            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.regulationDetails.label}</h2>
              <textarea 
                value={formData.regulationDetails || ''} 
                onChange={(e) => updateFormData({ regulationDetails: e.target.value })} 
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
                rows={5} 
                placeholder="규제 내용을 자세히 입력해주세요" 
              />
            </div>
          )}
        </div>
      )

    // Step 8: 최적화 프레임워크
    case 8:
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

    // Step 9: 포트폴리오 관리 전략 + (예 → 전략 선택) + (퀸타일 → 순위 기준)
    case 9:
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

          {/* 조건부: 전략 있으면 전략 선택 */}
          {formData.hasPreferredStrategy === true && (
            <div className="mt-8 pt-8 border-t-2 border-gray-200">
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

              {/* 조건부: 퀸타일이면 순위 기준 입력 */}
              {formData.preferredStrategy === '퀸타일 포트폴리오(Quintile)' && (
                <div className="mt-8 pt-8 border-t-2 border-gray-200">
                  <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.strategyRankingCriteria.label}</h2>
                  <input 
                    type="text" 
                    value={formData.strategyRankingCriteria || ''} 
                    onChange={(e) => updateFormData({ strategyRankingCriteria: e.target.value })} 
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
                    placeholder="순위 산정 기준을 입력해주세요" 
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )

    // Step 10: 신규 자산 추가 + (예 → 자산 입력)
    case 10:
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

          {/* 조건부: 자산 추가하면 자산 입력 */}
          {formData.addNewAssets === true && (
            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <h2 className="text-xl font-bold mb-6 text-gray-900">{ONBOARDING_QUESTIONS.newAssets.label}</h2>
              <textarea 
                value={formData.newAssets || ''} 
                onChange={(e) => updateFormData({ newAssets: e.target.value })} 
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
                rows={5} 
                placeholder="추가할 자산을 입력해주세요 (쉼표로 구분)" 
              />
            </div>
          )}
        </div>
      )

    // Step 11: 서비스 플랜
    case 11:
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

    // Step 12: 리밸런싱 여부 + (예 → 리밸런싱 방식)
    case 12:
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

          {/* 조건부: 리밸런싱하면 방식 선택 */}
          {formData.rebalancing === true && (
            <div className="mt-8 pt-8 border-t-2 border-gray-200">
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
          )}
        </div>
      )

    // Step 13: 포트폴리오 건전성 확인
    case 13:
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
      return <div className="text-center text-gray-500"><p>이 질문은 아직 구현되지 않았습니다.</p></div>
  }
}
