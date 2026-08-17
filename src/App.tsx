import "bootstrap/dist/css/bootstrap.min.css"
import "./customs.css"
import AppContent from "./components/AppContent"
import { AuthProvider } from "./utils/AuthContext"

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
