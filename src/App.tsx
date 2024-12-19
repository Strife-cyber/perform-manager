import { AppProvider } from "./context/context"
import AuthPage from "./pages/auth_page/auth_page"
import Landing from "./pages/landing_page/landing"
import IsEmployeeWare from "./middleware/is_employee"
import IsControllerWare from "./middleware/is_controller"
import { CustomToastContainer } from "./components/toast_component"
import EmployeeDashboard from "./pages/dashboard/employee_dashboard"
import ControllerDashboard from "./pages/dashboard/controller_dashboard"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProfilePage from "./pages/profile_page/profile_page"
import IsLogged from "./middleware/is_logged"

function App() {

  return (
    <AppProvider>
      <CustomToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/auth" element={<AuthPage/>}/>
          <Route path="/profile" element={<IsLogged children={<ProfilePage/>}/>}/>
          <Route path="/actions" element={<IsEmployeeWare children={<EmployeeDashboard/>}/>}/>
          <Route path="/dashboard" element={<IsControllerWare children={<ControllerDashboard/>}/>}/>
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
