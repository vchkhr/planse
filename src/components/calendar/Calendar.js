import React, { useState } from 'react';

import { Redirect } from "react-router-dom";

import moment from 'moment';

import { LeftBar } from '../leftBar/LeftBar';
import { TopNav } from '../calendar/TopNav';
import { CalendarBody } from '../calendar/CalendarBody';
import { Welcome } from '../account/Welcome';


export const Calendar = (props) => {
    const [redirectToLogin] = useState(false);
    const [view, setView] = useState('month');
    const [viewDate, setViewDate] = useState(moment());

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
                        <TopNav user={props.user} userLoaded={props.userLoaded} view={view} setView={setView} viewDate={viewDate} setViewDate={setViewDate} />

                        <CalendarBody user={props.user} userLoaded={props.userLoaded} view={view} viewDate={viewDate} />
                    </div>
                </div>
            );
        }
    }
};

export default Calendar;
