import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import logo from '../logo.svg';

const Logout = (props) => {
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_DOMAIN + '/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({})
        });

        console.log("Logout")

        setRedirect(true);
        props.setName("");
    }

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div className="form-signin text-center">
            <form onSubmit={submit}>
                <img className="mb-4" src={logo} alt="" width="72" height="57" />
                <h1 className="h3 mb-3 fw-normal">{props.name}, do you really want to log out?</h1>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Log Out</button>

                <p className="mt-5 mb-3 text-muted">&copy; PLANSE, 2021</p>
            </form>
        </div>
    );
};

export default Logout;
