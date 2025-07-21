import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart(prev => {
            const exists = prev.find(i => i.id === item.id);
            if (exists) return prev; // ❌ Already in cart, do nothing
            return [...prev, { ...item, quantity: 1 }]; // ✅ Add with initial quantity = 1
        });
    };

    const updateQuantity = (itemId, amount) => {
        setCart(prev =>
            prev
                .map(i =>
                    i.id === itemId ? { ...i, quantity: Math.max(0, i.quantity + amount) } : i
                )
                .filter(i => i.quantity > 0)
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
