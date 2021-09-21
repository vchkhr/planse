import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [registerRedirect, setRegisterRedirect] = useState(false);
    const [registerError, setRegisterError] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        setRegisterError('');

        fetch(process.env.REACT_APP_DOMAIN + '/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
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
                setRegisterRedirect(true);
                setRegisterError('');
                // props.setUser(response);
            })
            .catch(error => {
                setRegisterError(error.toString());
            });
    }

    if (registerRedirect) {
        return (
            <Redirect to={{ pathname: '/login', state: { justRegistered: 'true' } }}
            />
        );
    }

    let registerErrorText = (
        <div className="alert alert-danger" role="alert">{registerError}</div>
    );
    if (registerError === 'Error: Error 409: Conflict' || registerError === 'Error: Error 409: ') {
        registerErrorText = (
            <div className="alert alert-danger" role="alert">This email is already registered</div>
        );
    }

    return (
        <div className="form form-signUp text-center">
            {registerError ? registerErrorText : ''}

            <form onSubmit={submit}>
                <img className="mb-4" src="/logo.png" alt="PLANSE" width="72" height="72" />
                <h1 className="h3 mb-3 fw-normal">Register on PLANSE</h1>

                <p><Link to="/login">Login instead</Link></p>

                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingName" placeholder="Name" onChange={e => setName(e.target.value)} required />
                    <label htmlFor="floatingName">Name</label>
                </div>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingEmail" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                    <label htmlFor="floatingEmail">Email</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>

                <p className="mt-3 mb-3 text-muted">You will be redirected to the login page. Email verification doesn't needed</p>

                <p className="mt-5 mb-3 text-muted">&copy; PLANSE, 2021</p>
            </form>
        </div>
    );
};

export default Register;