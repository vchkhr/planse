import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { useLocation } from "react-router"


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginRedirect, setLoginRedirect] = useState(false);
    const [loginError, setLoginError] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        setLoginError('');

        fetch(process.env.REACT_APP_DOMAIN + '/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(
                response => {
                    if (response.ok) {
                        return response;
                    }
                    else {
                        let error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;

                        throw error;
                    }
                },
                error => {
                    throw error;
                }
            )
            .then(response => response.json())
            .then(response => {
                setLoginRedirect(true);
                setLoginError('');
                props.setUser(response);
            })
            .catch(error => {
                setLoginError(error.toString());
            });
    }

    if (loginRedirect) {
        return <Redirect to="/" />;
    }

    let loginErrorText = (
        <div className="alert alert-danger" role="alert">{loginError}</div>
    );
    if (loginError === 'Error: Error 401: Unauthorized' || loginError === 'Error: Error 401: ') {
        loginErrorText = (
            <div className="alert alert-danger" role="alert">Invalid email or password</div>
        );
    }

    let justRegistered = useLocation().state;
    let justRegisteredText = (
        <div></div>
    );
    if (justRegistered !== undefined && !loginError) {
        if (justRegistered['justRegistered'] !== 'false') {
            justRegisteredText = (
                <div className="alert alert-success" role="alert">Account has been successfully registered. Now you can login</div>
            )
        }
    }

    return (
        <div className="form form-signIn text-center">
            {loginError ? loginErrorText : ''}

            {justRegisteredText}

            <form onSubmit={submit}>
                <img className="mb-4" src="/logo.png" alt="PLANSE" width="72" height="72" />
                <h1 className="h3 mb-3 fw-normal">Login to PLANSE</h1>

                <p><Link to="/register">Register instead</Link></p>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} required />
                    <label htmlFor="floatingEmail">Email</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Log in</button>

                <p className="mt-5 mb-3 text-muted">&copy; PLANSE, 2021</p>
            </form>
        </div>
    );
};

export default Login;
