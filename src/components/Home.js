import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
    if (props.name) {
        return (
            <div>
                <p>Hi, {props.name}</p>
            </div>
        );
    }
    else {
        return (
            <div>
                <div className="alert alert-primary">
                    <p>You are not logged in.</p>

                    <p>
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Home;
