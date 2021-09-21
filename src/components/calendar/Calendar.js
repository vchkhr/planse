import React, { useState } from 'react';

import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

import { LeftBar } from '../leftBar/LeftBar';
import { CalendarList } from '../leftBar/CalendarList';
import { TopNav } from '../calendar/TopNav';
import { Welcome } from '../account/Welcome';


export const Calendar = (props) => {
    let date = new Date();

    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [view, setView] = useState('month');
    const [currentMonth, setcurrentMonth] = useState(date.getMonth() + '.' + date.getFullYear());

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
                        <TopNav user={props.user} userLoaded={props.userLoaded} view={view} setView={setView} currentMonth={currentMonth} />
                    </div>
                </div>
            );
        }
    }
};

export default Calendar;
