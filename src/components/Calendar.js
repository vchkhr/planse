import React, { useState } from 'react';

import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

import { Nav } from './Nav';
import { CalendarList } from './CalendarList';
import { CalendarTopNav } from './CalendarTopNav';
import { Welcome } from './account/Welcome';


const Calendar = (props) => {
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    if (redirectToLogin) {
        return <Redirect to="/login" />;
    }

    if (props.userLoaded === false) {
        return (
            <div className="text-center mt-5">Loading user information...</div>
        );
    }
    else {
        if (props.user.length === 0) {
            return (
                <Welcome />
            );
        }
        else {
            return (
                <div>
                    <Nav user={props.user} setUser={props.setUser} />

                    <div className="left-bar">
                        <p id="create-event">
                            <Link to="/event/create" role="button" className="btn btn-primary w-100"><i className="bi bi-plus-circle-dotted"></i> Create event</Link>
                        </p>
                        <h5 className="calendar-entry"><i className="bi bi-calendar"></i> Calendars</h5>
                        <h6 className="text-muted calendar-entry">Your calendars</h6>

                        <CalendarList user={props.user} userLoaded={props.userLoaded} />
                        <h6 className="mt-2 calendar-entry"><Link to="calendar/create" className="link-hidden"><i className="bi bi bi-calendar-plus"></i> Create calendar</Link></h6>
                    </div>
                    <div className="calendar">
                        <CalendarTopNav user={props.user} userLoaded={props.userLoaded} />
                    </div>
                </div>
            );
        }
    }
};

export default Calendar;
