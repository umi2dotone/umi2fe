import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import { useEffect } from "react";
export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile';
  // ⏩ Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate]);

  const handleGoogleLogin = async (response) => {
    const token = response.credential;
    await login(token);
    navigate(from, { replace: true }); // 🔁 Navigate to original page
  };

  return (
    <div className="login-container">
      <div className="top-section">
        <h1>Welcome to UMI2 🍽️</h1>
        <p>Delicious food delivered to your door</p>
      </div>
      <div className="middle-section">
        <GoogleLogin onSuccess={handleGoogleLogin} onError={(e) => console.log(e)} />
      </div>
      <footer className="footer-section">
        <p>© 2025 UMI2.one – All rights reserved.</p>
      </footer>
    </div>
  );
}
