import React, { useState } from 'react';

import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";

import { useLocation } from "react-router"


const CalendarUpdateMain = (props) => {
    const [id, setId] = useState('');

    const [calendarUpdateMainRedirect, setCalendarUpdateMainRedirect] = useState(false);

    const calendarUpdateMain = (e) => {
        e.preventDefault();

        console.log("ok");

        fetch(process.env.REACT_APP_DOMAIN + '/api/calendar/updateMain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                id
            })
        })
            .then(
                response => {
                    if (response.ok) {
                        return response;
                    }
                    else {
                        let error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;

                        throw error;
                    }
                },
                error => {
                    throw error;
                }
            )
            .then(response => response.json())
            .then(response => {
                setCalendarUpdateMainRedirect(true);
            })
            .catch(error => {
                alert(error);
            });
    }

    if (calendarUpdateMainRedirect) {
        return <Redirect to="/" />;
    }

    let mainName = useLocation().state;
    if (mainName !== undefined) {
        return (
            <div className="container mainDiv">
                <div className="form-signin text-center">
                    <form onSubmit={calendarUpdateMain}>
                        <h1 className="h3 mb-3 fw-normal">Change main calendar</h1>

                        <p>You are going to change your main calendar to the <code>{mainName['mainName']}</code> calendar.</p>

                        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Confirm</button>
                    </form>

                    <form>
                        <button className="w-100 btn btn-lg btn-danger mt-3" onClick={() => 5}>Delete calendar</button>
                    </form>
                </div>
            </div>
        );
    }
};

export default withRouter(CalendarUpdateMain);
