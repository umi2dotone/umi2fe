import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, updateQuantity } = useCart();

    if (cart.length === 0) {
        return <div className="cart-empty">🛒 Your cart is empty.</div>;
    }

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
                    <h3>Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</h3>
                </div>
            </div>
        </div>
    );
};

export default Cart;
