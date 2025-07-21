import { useEffect, useState } from 'react';
import api from '../utils/apiClient';
import { useCart } from '../context/CartContext';
import './Home.css';

const Home = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const { cart, addToCart } = useCart();

    useEffect(() => {
        const fetchMenu = async () => {
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
        <div className="gradient-page">
            <div className="home-container">
                <h2 className="home-title">Menu</h2>
                <div className="home-grid">
                    {
                        menu.map(item => {
                            const inCart = cart.some(i => i.id === item.id);
                            return (
                                <div key={item.id} className="home-card">
                                    <img src={item.imageData} alt={item.name} className="home-image" />
                                    <div className="home-info">
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                        <p className="home-price">${item.price.toFixed(2)}</p>
                                        <div className="home-actions">
                                            <button
                                                className="home-add-button"
                                                onClick={() => addToCart(item)}
                                                disabled={inCart}
                                            >
                                                {inCart ? 'In Cart' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;
