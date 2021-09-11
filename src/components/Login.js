import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// import logo from '../logo.svg';


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
        <div className="alert alert-danger" role="alert">
            {loginError === 'Error: Error 401: Unauthorized' ? 'Invalid email or password' : loginError}
        </div>
    );

    return (
        <div className="container mainDiv">
            <div className="form-signin text-center">
                {loginError ? loginErrorText : ''}

                <form onSubmit={submit}>
                    {/* <img className="mb-4" src={logo} alt="PLANSE" width="72" height="72" /> */}
                    <h1 className="h3 mb-3 fw-normal">Login</h1>

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
        </div>
    );
};

export default Login;
