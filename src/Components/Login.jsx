import React, { useState } from 'react';
import { closeLoginWindow } from '../script';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

/**
 * Eine Komponente zum Anmelden von Benutzern.
 * @param {Object} props - Die Eigenschaften der Login-Komponente.
 * @param {Function} props.onLogin - Die Funktion, die eine erfolgreiche Anmeldung verarbeitet.
 * @returns {JSX.Element} Die gerenderte Login-Komponente.
 */
function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    /**
     * Funktion zum Verarbeiten des Anmeldeformulars beim Einreichen.
     * @param {Event} event - Das Ereignisobjekt des Formulars.
     */
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
            toast.success('🦄 Anmeldung war erfolgreich.');
            const userInfo = data.data;

            // Aufrufen der onLogin-Funktion
            onLogin();

            // Cookies speichern
            if (userInfo.username) document.cookie = "username=" + userInfo.username + "; max-age=86400; path=/; domain=localhost";
            if (userInfo.firstname) document.cookie = "firstname=" + userInfo.firstname + "; max-age=86400; path=/; domain=localhost";
            if (userInfo.lastname) document.cookie = "lastname=" + username + "; max-age=86400; path=/; domain=localhost";
            if (userInfo.teammember) document.cookie = "teammember=" + userInfo.teammember + "; max-age=86400; path=/; domain=localhost";

            // Weiterleiten zum Tagebuch
            navigate('/tagebuch');
        } else {
            toast.error('🦄 Fehler beim Anmelden in der Datenbank');
        }
    };

    // Rendern der Login-Komponente
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
                        <button id="submitBtn" className="submitBtn" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;