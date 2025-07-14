import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [showAdminForm, setShowAdminForm] = useState(false);
  const navigate = useNavigate();

  const handleAddAdmin = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.post('https://api.umi2.one/auth/admin', { targetEmail: email }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.error || 'Error promoting user');
    }
  };

  return (
    <div className="profile-page">
      <div className="card">
        <h2>Welcome, {user?.email}</h2>
      </div>

      <div className="card toggle-card">
        <div className="toggle-open-button" onClick={() => navigate('/')}>
          🍱 See what’s on the menu
        </div>
      </div>

      {showAdminForm ? (
        <div className="card admin-card">
          <div className="admin-header">
            <h3>Promote New Admin</h3>
            <button className="close-button" onClick={() => setShowAdminForm(false)}>✕</button>
          </div>
          <input
            type="email"
            placeholder="Enter email to promote"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button className="admin-button" onClick={handleAddAdmin}>
            Add Admin
          </button>
          {msg && <p className="status-message">{msg}</p>}
        </div>
      ) : (
        <div className="card toggle-card">
          <button className="toggle-open-button" onClick={() => setShowAdminForm(true)}>
            ➕ Show Admin Tools
          </button>
        </div>
      )}

      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
