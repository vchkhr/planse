import React, { useState } from 'react';

import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

import { LeftBar } from '../leftBar/LeftBar';
import { CalendarList } from '../leftBar/CalendarList';
import { CalendarTopNav } from '../calendar/CalendarTopNav';
import { Welcome } from '../account/Welcome';


export const Calendar = (props) => {
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
                <div>
                    <LeftBar user={props.user} setUser={props.setUser} />
                    
                    <div className="calendar">
                        <CalendarTopNav user={props.user} userLoaded={props.userLoaded} />
                    </div>
                </div>
            );
        }
    }
};

export default Calendar;
