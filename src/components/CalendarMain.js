import React, { useEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive';
import { Redirect } from "react-router-dom";

import { LeftBar } from './leftBar/LeftBar';
import { Calendar } from './calendar/Calendar';
import { Welcome } from './account/Welcome';
import { ScreenSmall } from './ScreenSmall';

import { Spinner } from 'react-bootstrap';


const CalendarMain = (props) => {
    const [redirectToLogin] = useState(false);
    const [calendars, setCalendars] = useState('');
    const [calendarsLoaded, setCalendarsLoaded] = useState(false);

    const isMobile = useMediaQuery({ query: `(max-width: 1100px)` });

    useEffect(() => {
        fetchCalendars();
    }, []);

    const fetchCalendars = () => {
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
                // alert(error);
            });
    }

    if (redirectToLogin) {
        return <Redirect to="/login" />;
    }

    if (isMobile === true && process.env.REACT_APP_DOMAIN !== "http://localhost:8000") {
        return (
            <ScreenSmall />
        );
    }
    else if (props.userLoaded === false) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="grow" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>

                <p className="text-muted">First loading may take a while...</p>
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
                    <LeftBar user={props.user} setUser={props.setUser} calendars={calendars} calendarsLoaded={calendarsLoaded} fetchCalendars={fetchCalendars} />

                    <Calendar user={props.user} setUser={props.setUser} calendars={calendars} calendarsLoaded={calendarsLoaded} />
                </div>
            );
        }
    }
};

export default CalendarMain;
