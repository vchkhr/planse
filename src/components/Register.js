import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import logo from '../logo.svg';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_DOMAIN + '/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name, email, password
            })
        });

        console.log("Register")

        setRedirect(true);
    }

    if (redirect) {
        return (
            <Redirect to="/login" />
        );
    }

    return (
        <div className="container mainDiv">
            <div className="form-signup text-center">
                <form onSubmit={submit}>
                    <img className="mb-4" src={logo} alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Register</h1>

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

                    <p className="mt-5 mb-3 text-muted">&copy; PLANSE, 2021</p>
                </form>
            </div>
        </div>
    );
};

export default Register;
