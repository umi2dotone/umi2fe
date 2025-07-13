import { useAuth } from './context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';


export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) return <div>Loading...</div>; // or a spinner

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
