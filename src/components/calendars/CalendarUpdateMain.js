import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

import { withRouter } from 'react-router';
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
                <Spinner animation="grow" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }
    else {
        const calendarInfo = calendars.filter((calendar) => parseInt(calendar.id, 10) === id)[0];

        return (
            <Form className="formCard" onSubmit={calendarUpdateMain}>
                <p className="text-center">
                    <img className="mb-4" src="/logo.png" alt="PLANSE" />
                </p>

                <h1 className="h3 mb-3 fw-normal text-center">Update main calendar</h1>

                <p className="text-center">You are going to change your main calendar to the <code>{calendarInfo.name}</code> calendar.</p>

                <Button variant="primary" size="lg" className="w-100 mt-3" type="submit">Update main calendar</Button>
            </Form>
        );
    }
};

export default withRouter(CalendarEdit);
