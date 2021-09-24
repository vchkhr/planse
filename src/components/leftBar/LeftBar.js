import React, { useState } from 'react';

import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

import { CalendarList } from '../leftBar/CalendarList';
import { Welcome } from '../account/Welcome';
import { Calendar3, CalendarPlus, PlusCircleDotted } from 'react-bootstrap-icons';
import { Spinner } from 'react-bootstrap';


export const LeftBar = (props) => {
    const [redirectToLogin] = useState(false);

    if (redirectToLogin) {
        return <Redirect to="/login" />;
    }

    if (props.userLoaded === false) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="grow" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
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
                    <h5 className="calendar-entry"><Calendar3 /> PLANSE Calendars</h5>

                    <div className="d-flex calendar-entry">
                        <h6 className="text-muted flex-fill">Your calendars</h6>

                        <h6><Link to="calendar/create" className="text-secondary" title="Create calendar"><CalendarPlus /></Link></h6>
                    </div>
                    

                    <CalendarList user={props.user} userLoaded={props.userLoaded} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} />

                    <p className="mt-4">
                        <Link to="/event/create" className="btn btn-primary w-100"><PlusCircleDotted /> Create event</Link>
                    </p>
                </div>
            );
        }
    }
};

export default LeftBar;
