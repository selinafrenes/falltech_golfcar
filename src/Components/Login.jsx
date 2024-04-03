import React, { useState } from 'react';
import { closeLoginWindow } from '../script';
import {useNavigate} from "react-router-dom"; // Pfad zum File anpassen

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (data.success) {
            console.log("Successsssssssss");
            onLogin();
            // wichtig, damit cookie auf localhost läuft!!!!
            document.cookie = "username=" + username + "; max-age=86400; path=/; domain=localhost";

            navigate('/tagebuch');
            // closeLoginWindow();
        } else {
            alert(data.message);
        }
    };

    return (
        <div>
            <div className="login-window" id="loginWindow" style={{ display: 'none' }}>
                <div className="login-content">
                    <span className="close-btn" onClick={closeLoginWindow}>&times;</span>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit} id="loginForm">
                        <label htmlFor="username">Username:</label>
                        <input
                            className="input-text-field"
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            className="input-text-field"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="submitBtn" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;