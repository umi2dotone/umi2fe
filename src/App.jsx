import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import TabLayout from './components/TabLayout';
import {GoogleOAuthProvider} from "@react-oauth/google"
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Cart from './pages/Cart';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <TabLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </GoogleOAuthProvider>

  );
}

export default App;
