import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Login = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (event) => { setEmail(event.target.value); };
    const handlePasswordChange = (event) => { setPassword(event.target.value); };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSend = { email, password };
        const url = `${process.env.BACKEND_URL}/api/login`;
        const options = {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorData = await response.json();
                console.log('Error:', errorData.message);
                alert(`Error: ${errorData.message}`);
                return;
            }
            const data = await response.json();
            if (data.results && data.results.email) {
                localStorage.setItem('token', data.access_token);
                actions.setIsLogin(true);
                actions.setCurrentUser(data.results.email);
                window.location.reload();
            } else {
                console.log('Error: Invalid response structure');
                alert('Error: Invalid response structure');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-3 display-5">Iniciar sesión</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mt-3 h6">
                                    <label htmlFor="email" className="mb-1">Correo electrónico:</label>
                                    <input type="email" className="form-control" id="email"
                                        value={email} onChange={handleEmailChange} required />
                                </div>
                                <div className="form-group mt-3 h6">
                                    <label htmlFor="password" className="mb-1">Contraseña:</label>
                                    <input type="password" className="form-control" id="password"
                                        value={password} onChange={handlePasswordChange} required />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-4">Iniciar sesión</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
