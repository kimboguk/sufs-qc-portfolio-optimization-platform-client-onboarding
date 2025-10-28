// src/utils/constants.ts

export const ONBOARDING_QUESTIONS = {
  businessField: {
    label: '사업 분야를 알려주세요',
    options: [
      {
        value: 'finance',
        label: '금융',
        subcategories: ['은행', '증권', '자산운용', '기타']
      },
      {
        value: 'marketing',
        label: '마케팅',
        subcategories: ['온라인', '오프라인']
      }
    ]
  },

  assetCount: {
    label: '현재 포트폴리오에 보유 중인 자산은 몇 개입니까?',
    options: ['50개 미만', '50개~200개', '200개~2,000개', '2,000개 초과']
  },

  hasDerivatives: {
    label: '포트폴리오에 파생상품이 포함되어 있습니까?',
  },

  includeDerivatives: {
    label: '포트폴리오 최적화에 파생상품을 포함시키시겠습니까?',
  },

  includeTransactionCost: {
    label: '포트폴리오 최적화에 거래 비용을 포함하시겠습니까?',
  },

  optimizationPeriod: {
    label: '포트폴리오 최적화 수행 기간을 선택해주세요',
    options: ['단일 기간', '다중 기간(예: K개월 동안 매일 최적화)']
  },

  constraints: {
    label: '고려하고 싶은 제약 조건을 모두 선택해주세요 (복수선택)',
    options: [
      '양(+)의 값 (No Short)',
      '예산',
      '자기자본',
      '보유량',
      '종목 수',
      '레버리지',
      '회전율',
      '시장 중립',
      '최대 포지션',
      '희소성'
    ]
  },

  hasRegulationConstraints: {
    label: '포트폴리오 관리에 적용되는 규제 제약이 있습니까?',
  },

  regulationDetails: {
    label: '구체적인 규제 내용을 알려주세요',
  },

  optimizationFramework: {
    label: '선호하는 최적화 프레임워크를 선택해주세요',
    options: [
      '스토캐스틱 포트폴리오 최적화(Stochastic Portfolio Optimization, SPO)',
      '팩터 기반 로버스트 최적화(Factor Based Robust Optimization, FBRO)',
      '강화학습 기반 최적화(Reinforcement Learning Based Optimization, RLBO)',
      '평균-분산 최적화(Mean-Variance Optimization, MVO)',
      '글로벌 최소 분산 포트폴리오 최적화(Global Minimum Variance Portfolio Optimization, GMVPO)',
      '샤프 지수 최대화 포트폴리오 최적화(Maximum Sharpe Ratio Portfolio Optimization, MSRPO)',
      '효용 함수 최적화: 로그 | 제곱근 | 역수 | 거듭 제곱 | 지수',
      '평균-CVaR 최적화'
    ]
  },

  hasPreferredStrategy: {
    label: '선호하는 포트폴리오 관리 전략이 있습니까?',
  },

  preferredStrategy: {
    label: '어떤 전략을 선호하십니까?',
    options: [
      '매수 후 보유(Buy & Hold)',
      '동일 가중치 포트폴리오(1/N)',
      '퀸타일 포트폴리오(Quintile)',
      '전역 최대 수익 포트폴리오'
    ]
  },

  strategyRankingCriteria: {
    label: '순위 산정 시 선호하는 기준을 기입해주세요',
  },

  addNewAssets: {
    label: '최적화를 위해 현재 포트폴리오에 포함되지 않은 새로운 자산을 추가하시겠습니까?',
  },

  newAssets: {
    label: '추가할 자산을 알려주세요',
  },

  servicePlan: {
    label: '이용 가능한 서비스 플랜',
    options: [
      '부분 양자 기술, 부분 고전 기술 사용(예: 양자 자산 선택, 고전 최적화)',
      '완전 양자 컴퓨팅 사용',
      '전처리 기술 포함(PCA 통한 그룹화 등)'
    ]
  },

  rebalancing: {
    label: '최적화 결과에 따라 포트폴리오를 리밸런싱하시겠습니까?',
  },

  rebalancingType: {
    label: '리밸런싱을 자동으로 진행하시겠습니까, 아니면 수동으로 진행하시겠습니까?',
    options: ['자동', '수동', '반자동']
  },

  checkPortfolioHealth: {
    label: '포트폴리오의 건전성을 확인하시겠습니까?',
  },

  pricingModel: {
    label: '요금 안내',
    options: [
      '계층적 그룹 최적화(상위 계층 고전 최적화 | 하위 계층 양자 최적화)',
      '계층적 그룹 최적화(양자 최적화)',
      '계층적 그룹 최적화(고전 최적화)',
      '일괄 최적화(양자 최적화)'
    ]
  },

  agreedToTerms: {
    label: '가격 및 기타 약관에 동의하십니까?',
  }
} as const