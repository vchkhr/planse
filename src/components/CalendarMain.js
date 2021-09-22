import React, { useState } from 'react';

import { Redirect } from "react-router-dom";

import { LeftBar } from './leftBar/LeftBar';
import { Calendar } from './calendar/Calendar';
import { Welcome } from './account/Welcome';


const CalendarMain = (props) => {
    const [redirectToLogin] = useState(false);

    if (redirectToLogin) {
        return <Redirect to="/login" />;
    }

    if (props.userLoaded === false) {
        return (
            <div className="text-center mt-5">
                <p><br />Loading user information...</p>
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
                    
                    <Calendar user={props.user} setUser={props.setUser} />
                </div>
            );
        }
    }
};

export default CalendarMain;
