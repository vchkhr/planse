import React from 'react';

import { Link } from 'react-router-dom';


export const Welcome = () => {
    return (
        <div className="form form-signInOrUp text-center">
            <form>
                <img className="mb-4" src="/logo.png" alt="PLANSE" width="72" height="72" />
                <h1 className="h3 mb-3 fw-normal">Welcome to PLANSE</h1>

                <p>Online calendar application.</p>

                <Link to="/login" role="button" className="w-100 btn btn-lg btn-primary">Log in</Link>
                <Link to="/register" role="button" className="w-100 btn btn-lg btn-outline-primary mt-3">Register</Link>

                <p className="mt-5 mb-3 text-muted">&copy; PLANSE, 2021</p>
            </form>
        </div>
    );
};

export default Welcome;
