import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import api from '../utils/apiClient';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();

  const [form, setForm] = useState({ name: '', description: '', price: '', imageFile: null });
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', price: '', imageFile: null });
  const [editPreview, setEditPreview] = useState(null);

  // Load all menu items
  useEffect(() => {
    const fetchItems = async () => {
      const token = sessionStorage.getItem('token');
      try {
        const res = await api.get('/menu');
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchItems();
  }, [message]);

  // Add new item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.price || !form.imageFile) {
      setMessage('All fields are required.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const token = sessionStorage.getItem('token');
        await api.post('/menu/add',
          {
            name: form.name,
            description: form.description,
            price: parseFloat(form.price),
            imageData: reader.result,
          }
        );
        setMessage('Item added!');
        setForm({ name: '', description: '', price: '', imageFile: null });
        setPreview(null);
      } catch (err) {
        console.error(err);
        setMessage('Failed to add item');
      }
    };
    reader.readAsDataURL(form.imageFile);
  };

  // Delete item
  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('token');
    // Delete item
    await api.delete(`/menu/${id}`);
    setItems(items.filter(i => i.id !== id));
  };

  // Start editing
  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      description: item.description,
      price: item.price,
      imageFile: null,
    });
    setEditPreview(item.imageData);
  };

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');

    const update = async (imageData) => {
      await api.put(`/menu/${editingId}`, {
        name: editForm.name,
        description: editForm.description,
        price: parseFloat(editForm.price),
        imageData,
      });

      setEditingId(null);
      setEditForm({ name: '', description: '', price: '', imageFile: null });
      setEditPreview(null);
      setMessage('Item updated!');
    };

    if (editForm.imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => update(reader.result);
      reader.readAsDataURL(editForm.imageFile);
    } else {
      update(editPreview);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Welcome, {user?.name}</h2>
        <button onClick={logout}>Logout</button>

        {user?.role === 'ADMIN' && (
          <>
            <h3 style={{ marginTop: '2rem' }}>Manage Menu Items</h3>
            {items.map(item => (
              <div key={item.id} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
                <img src={item.imageData} alt={item.name} style={{ width: '100px', borderRadius: '4px' }} />
                <h4>{item.name} - ${item.price}</h4>
                <p>{item.description}</p>
                <button onClick={() => startEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '0.5rem', color: 'red' }}>Delete</button>

                {editingId === item.id && (
                  <form onSubmit={handleEditSubmit} className="add-item-form" style={{ marginTop: '1rem' }}>
                    <input
                      name="name"
                      value={editForm.name}
                      onChange={(e) => setEditForm(f => ({ ...f, name: e.target.value }))}
                      className="add-item-input"
                    />
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={(e) => setEditForm(f => ({ ...f, description: e.target.value }))}
                      className="add-item-textarea"
                    />
                    <input
                      type="number"
                      name="price"
                      value={editForm.price}
                      onChange={(e) => setEditForm(f => ({ ...f, price: e.target.value }))}
                      className="add-item-input"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setEditForm(f => ({ ...f, imageFile: file }));
                        setEditPreview(URL.createObjectURL(file));
                      }}
                      className="add-item-file"
                    />
                    {editPreview && <img src={editPreview} alt="Preview" className="add-item-preview" />}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button type="submit" className="add-item-button">Update Item</button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setEditForm({ name: '', description: '', price: '', imageFile: null });
                          setEditPreview(null);
                        }}
                        className="add-item-button"
                        style={{ backgroundColor: '#aaa' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))}
            <h3>Add Menu Item</h3>
            <form onSubmit={handleSubmit} className="add-item-form">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="add-item-input"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="add-item-textarea"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className="add-item-input"
              />
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files[0];
                  setForm(f => ({ ...f, imageFile: file }));
                  setPreview(URL.createObjectURL(file));
                }}
                className="add-item-file"
              />
              {preview && <img src={preview} alt="Preview" className="add-item-preview" />}
              <button type="submit" className="add-item-button">Add Item</button>
            </form>
            <p>{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
