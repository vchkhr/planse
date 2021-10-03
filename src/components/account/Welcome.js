import React from 'react';
import { Form } from 'react-bootstrap';

import { Link } from 'react-router-dom';


export const Welcome = () => {
    return (
        <div>
            <Form className="formCard">
                <p className="text-center">
                    <img className="mb-4" src="/logo.png" alt="PLANSE" />
                </p>

                <h1 className="h3 mb-3 fw-normal text-center">Welcome to PLANSE</h1>

                <p className="text-center">Online calendar application.</p>

                <Link to="/login" className="w-100 btn btn-lg btn-primary">Log in</Link>
                <Link to="/register" className="w-100 btn btn-lg btn-outline-primary mt-3">Register</Link>

                <p className="mt-5 mb-3 text-muted text-center">&copy; PLANSE, 2021</p>
            </Form>
        </div>
    );
};

export default Welcome;
