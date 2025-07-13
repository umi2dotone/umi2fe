import { useAuth } from '../context/AuthContext';

export default function Menu() {
    const { user } = useAuth();

    return user ? (
        <div>
            <h1>Menu Page</h1>
            {/* your menu UI */}
        </div>
    ) : null;
}
