import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../copmonent/Header';
import styles from '../style/Main.module.css';

function Register() {
    const [name, setName] = useState({ value: '', error: '' });
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('username', name.value);
    try {
        const postResponse = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: name.value }),
        });

        const postData = await postResponse.json();
        console.log('Post Response:', postResponse);
        console.log('Post Data:', postData);
        
        const getResponse = await fetch(`https://jsonplaceholder.typicode.com/users?username=${name.value}`);
        const getData = await getResponse.json();
        
        console.log('Get Response:', getResponse);
        console.log('Get Data:', getData);
    
        if (getData.length > 0) {
            alert('User exists');
            navigate('/');
        } else {
            console.log('User does not exist');
            navigate('/');
        }
        } catch (error) {
            console.error('Error fetching user:', error);
            navigate('/');
        }
    };
    
    return (
        <div className={styles.main}>
            <Header />
            <div className={styles.mainForm}>
                <div className={styles.form}>
                    <p className={styles.pForm}>Sign In</p>
                    <h2 className={styles.heading2}>User name</h2>
                    <form className={styles.form1} onSubmit={handleSubmit}>
                        <input
                        type="text"
                        value={name.value}
                        onChange={(e) => setName({ ...name, value: e.target.value })}
                        placeholder="User name"
                        />
                        <button className={styles.btnForm} type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
    }

export default Register
