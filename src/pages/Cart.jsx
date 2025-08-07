import { useCart } from '../context/CartContext';
import api from '../utils/apiClient';
import './Cart.css';

const Cart = () => {
    const { cart, updateQuantity } = useCart();

    const handleCheckout = async () => {
        try {
            const response = await api.post('/payment/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cart }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url; // Redirect to Stripe Checkout
            } else {
                alert('Failed to start checkout');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Error during checkout. Please try again.');
        }
    };

    if (cart.length === 0) {
        return <div className="cart-empty">🛒 Your cart is empty.</div>;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="gradient-page">
            <div className="cart-container">
                <h2>Your Cart</h2>

                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.imageData} alt={item.name} className="cart-image" />

                        <div className="cart-content">
                            <div className="cart-info">
                                <h4>{item.name}</h4>
                                <p>${item.price.toFixed(2)}</p>
                            </div>

                            <div className="cart-quantity">
                                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="cart-total">
                    <h3>Total: ${total.toFixed(2)}</h3>
                    <button className="checkout-button" onClick={handleCheckout}>
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
