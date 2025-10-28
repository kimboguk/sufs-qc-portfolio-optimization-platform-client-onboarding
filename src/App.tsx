import { HashRouter, Routes, Route } from 'react-router-dom'
import OnboardingPage from './pages/OnboardingPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/" element={<div className="text-center p-10">
          <h1 className="text-2xl font-bold mb-4">금융 포트폴리오 최적화 플랫폼</h1>
          <a href="/#/onboarding" className="text-blue-600 hover:underline">
            온보딩 시작
          </a>
        </div>} />
      </Routes>
    </HashRouter>
  )
}

export default App