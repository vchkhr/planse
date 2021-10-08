import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { CalendarX, ChevronLeft } from 'react-bootstrap-icons';

import { withRouter } from 'react-router';
import { Link, Redirect } from "react-router-dom";


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
                setCalendarsLoaded(false);
            });
    }

    if (calendarsLoaded !== true) {
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

        let deleteButton = (
            <div>
                <Alert key={calendarInfo.id} variant="danger" className="text-center mt-3">This action is irreversible</Alert>
                <Button variant="danger" size="lg" className="w-100 mt-3" type="submit">Delete calendar <CalendarX /></Button>
            </div>
        );

        if (props.user.main_calendar === calendarInfo.id) {
            deleteButton = (
                <Alert key={calendarInfo.id} variant="warning" className="text-center">You can't delete your main calendar</Alert>
            );
        }

        return (
            <Form className="formCard" onSubmit={calendarDelete}>
                <p className="text-center">
                    <img className="mb-4" src="/logo.png" alt="PLANSE" />
                </p>

                <h1 className="h3 mb-3 fw-normal text-center">Delete <code>{calendarInfo.name}</code> calendar</h1>

                <p className="text-center">You are going to delete this calendar.<br />All events in this calendar, as well as access settings will be deleted</p>

                {deleteButton}

                <Link to="/" className="btn btn-outline-secondary w-100 mt-3"><ChevronLeft />Go back to Calendar</Link>
            </Form>
        );
    }
};

export default withRouter(CalendarDelete);
