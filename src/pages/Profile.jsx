import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Profile() {
  const { user, logout } = useAuth();
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleAddAdmin = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const res = await fetch('https://api.umi2.one/auth/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ targetEmail: newAdminEmail }) // ✅ updated to match backend
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ ${newAdminEmail} is now an admin.`);
        setNewAdminEmail('');
      } else {
        setMessage(`❌ Failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Network error');
    }
  };

  return (
    <div className="profile-page">
      <h1>Welcome, {user?.email}</h1>

      {user?.role === 'ADMIN' && (
        <div className="admin-section">
          <h2>👑 Add a new admin</h2>
          <input
            type="email"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            placeholder="Enter user's email"
          />
          <button onClick={handleAddAdmin}>Add Admin</button>
          {message && <p>{message}</p>}
        </div>
      )}

      <hr />
      <p>🧾 Order history: (placeholder)</p>
      <button onClick={() => (window.location.href = '/')}>
        See what's on the menu today 🍱
      </button>

      <br /><br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}
