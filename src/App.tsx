import "bootstrap/dist/css/bootstrap.min.css"
import "./customs.css"
import AppContent from "./components/AppContent"
import { AuthProvider } from "./utils/AuthProvider"

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
