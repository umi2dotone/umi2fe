import { useEffect, useState } from 'react';
import api from '../utils/apiClient';
import './Home.css';

const Home = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            const token = sessionStorage.getItem('token');
            try {
                const res = await api.get('/menu');
                setMenu(res.data);
            } catch (err) {
                console.error('Failed to load menu:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    if (loading) return <div className="home-loading">Loading menu...</div>;

    return (
        <div className="home-container">
            <h2 className="home-title">Menu</h2>
            <div className="home-grid">
                {menu.map(item => (
                    <div key={item.id} className="home-card">
                        <img src={item.imageData} alt={item.name} className="home-image" />
                        <div className="home-info">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p className="home-price">${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
