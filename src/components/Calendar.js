import React from 'react';

import { Link } from 'react-router-dom';

import { CalendarList } from './CalendarList';


const Calendar = (props) => {
    if (props.userLoaded === false) {
        return (
            <div>Loading user information...</div>
        );
    }
    else {
        if (props.user.length === 0) {
            return (
                <div className="container mainDiv">
                    <div className="alert alert-primary">
                        <p>You are not logged in.</p>

                        <p>
                            <Link to="/login" className="alert-link">Login</Link> or <Link to="/register" className="alert-link">Register</Link>
                        </p>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="left-bar">
                    <p id="create-event">
                        <Link to="/event/create" role="button" className="btn btn-primary w-100"><i className="bi bi-plus-circle-dotted"></i> Create event</Link>
                    </p>

                    <h5><i className="bi bi-calendar"></i> Calendars</h5>

                    <h6>Your calendars</h6>
                    
                    <CalendarList user={props.user} userLoaded={props.userLoaded} />

                    <h6 className="mt-2"><Link to="calendar/create" className="link-hidden"><i className="bi bi bi-calendar-plus"></i> Create calendar</Link></h6>
                </div>
            );
        }
    }
};

export default Calendar;
