import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppProvider } from "./context/context"
import Landing from "./pages/landing_page/landing"
import AuthPage from "./pages/auth_page/auth_page"
import IsControllerWare from "./middleware/is_controller"
import ControllerDashboard from "./pages/dashboard/controller_dashboard"
import ReviewEvaluationForms from "./pages/dashboard/employee_components/review_evaluation_forms"
import { CustomToastContainer } from "./components/toast_component"

function App() {

  return (
    <AppProvider>
      <CustomToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/auth" element={<AuthPage/>}/>
          <Route path="/dashboard" element={<IsControllerWare children={<ControllerDashboard/>}/>}/>
          <Route path="/actions" element={<ReviewEvaluationForms/>}/>
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
