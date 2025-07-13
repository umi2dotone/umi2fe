import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Menu from './pages/Menu';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ProtectedRoute from "./ProtectedRoute";

export default function App() {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        } />
      </Routes>
    </GoogleOAuthProvider>
  );
}