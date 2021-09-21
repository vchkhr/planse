import React, { useEffect, useState } from 'react';

import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";


const CalendarDelete = (props) => {
    const [calendarDeleteRedirect, setCalendarDeleteRedirect] = useState(false);
    const [id] = useState(parseInt(props.match.params.id, 10))

    const [calendars, setCalendars] = useState('');
    const [calendarsLoaded, setCalendarsLoaded] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const calendarDelete = (e) => {
        e.preventDefault();

        fetch(process.env.REACT_APP_DOMAIN + '/api/calendar/delete/' + id, {
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
                setCalendarDeleteRedirect(true);
            })
            .catch(error => {
                alert(error);
            });
    }

    if (calendarDeleteRedirect) {
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

        let deleteButton = (
            <button className="w-100 btn btn-lg btn-danger mt-3" type="submit">Delete calendar</button>
        );
        if (props.user.main_calendar === calendarInfo.id) {
            deleteButton = (
                <p>You can't delete your main calendar.</p>
            );
        }

        return (
            <div className="container">
                <div className="form text-center">
                    <form onSubmit={calendarDelete}>
                        <h1 className="h3 mb-3 fw-normal">Delete <code>{calendarInfo.name}</code> calendar</h1>

                        <p>You are going to delete this calendar. All events in this calendar, as well as access settings will be deleted.</p>

                        {deleteButton}
                    </form>
                </div>
            </div>
        );
    }
};

export default withRouter(CalendarDelete);
