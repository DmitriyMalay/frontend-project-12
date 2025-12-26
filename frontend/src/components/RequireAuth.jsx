import { Navigate } from 'react-router-dom'

const RequireAuth = ({ children }) => {
  const isAuthorized = !!localStorage.getItem('auth')
  return isAuthorized ? children : <Navigate to="/login" replace />
}

export default RequireAuth
