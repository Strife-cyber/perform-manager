import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppProvider } from "./context/context"
import Landing from "./pages/landing_page/landing"
import AuthPage from "./pages/auth_page/auth_page"

function App() {

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/auth" element={<AuthPage/>}/>
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
