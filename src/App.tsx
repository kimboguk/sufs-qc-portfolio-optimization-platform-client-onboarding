import { HashRouter, Routes, Route } from 'react-router-dom'
import OnboardingPage from './pages/OnboardingPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/" element={<div className="text-center p-10">
          <div className="h-32"></div>
          <h1 className="text-2xl font-bold mb-4">금융 포트폴리오 최적화 플랫폼</h1>
          <a href="#/onboarding" className="text-blue-600 hover:underline">
            온보딩 시작
          </a>
            <div className="mt-20 pt-6 border-t text-sm text-gray-500">
    <p>© SUFS 2025, All Rights Reserved.</p>
  </div>
        </div>
      } />
      </Routes>
    </HashRouter>
  )
}

export default App