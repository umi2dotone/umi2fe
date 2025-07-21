import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import TabLayout from './components/TabLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import {CartProvider} from "./context/CartContext";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <ProtectedRoute>
            <CartProvider>
              <TabLayout />
            </CartProvider>
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
