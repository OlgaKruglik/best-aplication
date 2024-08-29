import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../style/Main.module.css';

function Header() {
    const [isInput, setIsInput] = useState(false)

    const toogleInput = () => {
        setIsInput(!isInput)

    }
    return (
        <div className={styles.header}>
            <h1 className={styles.heading1}>Best Application</h1>
            <Link to="/register">
                <input className={styles.btn} type='button' value='Sign In' onClick={toogleInput}/>
            </Link>
        </div>
    )
}

export default Header
