import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import logo from '../logo.svg';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json();

        setRedirect(true);
        props.setName(content.name);
    }

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div className="form-signin text-center">
            <form onSubmit={submit}>
                <img className="mb-4" src={logo} alt="" width="72" height="57" />
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} required />
                    <label htmlFor="floatingEmail">Email</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                {/* <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div> */}
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                {/* <p className="mt-5 mb-3 text-muted">&copy; 2021</p> */}
            </form>
        </div>
    );
};

export default Login;
