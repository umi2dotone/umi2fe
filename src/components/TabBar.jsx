import React from 'react';
import { NavLink } from 'react-router-dom';
import './TabBar.css';

const tabs = [
    { to: '/', icon: '🏠', label: 'Home' },
    { to: '/orders', icon: '📦', label: 'Orders' },
    { to: '/cart', icon: '🛒', label: 'Cart' },
    { to: '/profile', icon: '👤', label: 'Profile' },
];

const TabBar = () => {
    return (
        <nav className="tab-bar">
            {tabs.map(tab => (
                <NavLink
                    key={tab.to}
                    to={tab.to}
                    className={({ isActive }) =>
                        'tab-item' + (isActive ? ' active' : '')
                    }
                >
                    <div className="icon">{tab.icon}</div>
                    <div className="label">{tab.label}</div>
                </NavLink>
            ))}
        </nav>
    );
};

export default TabBar;
