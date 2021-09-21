import React from 'react';

import { Link } from 'react-router-dom';

const NavOld = () => {
    return (
        <div>
            <Link to="/" className="navbar-brand"> PLANSE</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </div>
    );
}

export default NavOld;
