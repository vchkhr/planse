import React from 'react';

import { Link } from 'react-router-dom';

const Calendar = (props) => {
    if (props.name) {
        return (
            <div className="container mainDiv">
                Logged in
            </div>
        );
    }
    else {
        return (
            <div className="container mainDiv">
                <div className="alert alert-primary">
                    <p>You are not logged in.</p>

                    <p>
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        );
    }
};

export default Calendar;
