import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppProvider } from "./context/context"
import Landing from "./pages/landing_page/landing"
import AuthPage from "./pages/auth_page/auth_page"
import IsControllerWare from "./middleware/is_controller"
import PerformanceEvaluations from "./pages/dashboard/controller_components/performance_evaluations"

function App() {

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/auth" element={<AuthPage/>}/>
          <Route path="/dashboard" element={<IsControllerWare children={<PerformanceEvaluations/>}/>}/>
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
