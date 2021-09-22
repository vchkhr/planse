import React, { useEffect, useState } from 'react';

import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";


const CalendarEdit = (props) => {
    const [calendarUpdateMainRedirect, setCalendarUpdateMainRedirect] = useState(false);
    const [id] = useState(parseInt(props.match.params.id, 10))

    const [calendars, setCalendars] = useState('');
    const [calendarsLoaded, setCalendarsLoaded] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const calendarUpdateMain = (e) => {
        e.preventDefault();

        fetch(process.env.REACT_APP_DOMAIN + '/api/calendar/updateMain/' + id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({

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
                props.setUser(response);
            })
            .catch(error => {
                alert(error);
            });
    }

    if (calendarUpdateMainRedirect) {
        return <Redirect to="/" />;
    }

    const fetchData = () => {
        setCalendarsLoaded(false);

        fetch(process.env.REACT_APP_DOMAIN + '/api/calendar/index', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
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
                setCalendars(response);
                setCalendarsLoaded(true);
            })
            .catch(error => {
                alert(error);
            });
    }

    if (calendarsLoaded === false) {
        return (
            <div className="text-center mt-5">
                <p>Loading information about this calendar...</p>
            </div>
        );
    }
    else {
        const calendarInfo = calendars.filter((calendar) => parseInt(calendar.id, 10) === id)[0];

        return (
            <div className="container">
                <div className="form text-center">
                    <form onSubmit={calendarUpdateMain}>
                        <h1 className="h3 mb-3 fw-normal">Update main calendar</h1>

                        <p>You are going to change your main calendar to the <code>{calendarInfo.name}</code> calendar.</p>

                        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Update main calendar</button>
                    </form>
                </div>
            </div>
        );
    }
};

export default withRouter(CalendarEdit);
