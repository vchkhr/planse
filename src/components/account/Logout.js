import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';
import { Redirect } from 'react-router-dom';


const Logout = (props) => {
    const [logoutRedirect, setLogoutRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_DOMAIN + '/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({})
        });

        setLogoutRedirect(true);
        props.setUser([]);
    }

    if (logoutRedirect) {
        return <Redirect to="/" />;
    }

    return (
        <Form onSubmit={submit}>
            <p className="text-center">
                <img className="mb-4" src="/logo.png" alt="PLANSE" />
            </p>

            <h1 className="h3 mb-3 fw-normal text-center">{props.user.name}, do you really want to log out?</h1>

            <Button variant="primary" type="submit" size="lg" className="w-100">Log out <BoxArrowRight /></Button>

            <p className="mt-5 mb-3 text-muted text-center">&copy; PLANSE, 2021</p>
        </Form>
    );
};

export default Logout;
