import React from 'react';
import { Link } from 'react-router-dom';

import { CalendarsList } from './CalendarsList';


const Home = (props) => {
    if (!props.userLoaded) {
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
    else {
        return (
            <div className="left-bar">
                <h5>Calendars</h5>

                <CalendarsList mainCalendar={props.mainCalendar} />
            </div>
        );
    }
}

export default Home;
