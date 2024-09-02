import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../style/Main.module.css';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem('username');
        setIsLoggedIn(!!username);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className={styles.header}>
            <h1 className={styles.heading1}>Best Application</h1>
            <div className={styles.divButton}>
                {isLoggedIn ? (
                    <input className={styles.btn} type='button' value='Logged out' onClick={handleLogout} />
                ) : (
                location.pathname === '/register' ? (
                    <Link to="/">
                        <input className={styles.btn} type='button' value='Back' />
                    </Link>
                    ) : (
                    <Link to="/register">
                        <input className={styles.btn} type='button' value='Sign In' />
                    </Link>
                )
                )}
            </div>
        </div>
    );
}

export default Header
