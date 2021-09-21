import React, { useState } from 'react';

import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

import { CalendarList } from '../leftBar/CalendarList';
import { Welcome } from '../account/Welcome';


export const LeftBar = (props) => {
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    if (redirectToLogin) {
        return <Redirect to="/login" />;
    }

    if (props.userLoaded === false) {
        return (
            <div className="text-center mt-5">
                <p>Loading user information...</p>
            </div>
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
                <div className="left-bar">

                    <h5 className="calendar-entry"><i className="bi bi-calendar"></i> PLANSE Calendars</h5>

                    <div className="d-flex calendar-entry">
                        <h6 className="text-muted flex-fill">Your calendars</h6>

                        <h6><Link to="calendar/create" className="link-gray" title="Create calendar"><i className="bi bi bi-calendar-plus"></i></Link></h6>
                    </div>
                    

                    <CalendarList user={props.user} userLoaded={props.userLoaded} />

                    <p className="mt-4">
                        <Link to="/event/create" role="button" className="btn btn-primary w-100"><i className="bi bi-plus-circle-dotted"></i> Create event</Link>
                    </p>
                </div>
            );
        }
    }
};

export default LeftBar;
