import React from 'react';

import { Link } from 'react-router-dom';

import { CalendarList } from './CalendarList';


const Calendar = (props) => {
    if (props.userLoading === true) {
        return (
            <div>Loading User Information...</div>
        );
    }
    else {
        if (props.user.length === 0) {
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
                    <h5><i className="bi bi-calendar"></i> Calendars</h5>

                    <h6>Your calendars</h6>
                    
                    <CalendarList user={props.user} userLoading={props.userLoading} />

                    <h6 className="mt-2"><Link to="calendar/create" className="link-hidden"><i className="bi bi-plus-circle-dotted"></i> Create a calendar</Link></h6>
                </div>
            );
        }
    }
};

export default Calendar;
