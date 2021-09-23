import React, { useEffect, useState } from 'react';

import { Redirect } from "react-router-dom";

import { LeftBar } from './leftBar/LeftBar';
import { Calendar } from './calendar/Calendar';
import { Welcome } from './account/Welcome';
import { Spinner } from 'react-bootstrap';


const CalendarMain = (props) => {
    const [redirectToLogin] = useState(false);
    const [calendars, setCalendars] = useState('');
    const [calendarsLoaded, setCalendarsLoaded] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

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
                // alert(error);
            });
    }

    if (redirectToLogin) {
        return <Redirect to="/login" />;
    }

    if (props.userLoaded === false) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="grow" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
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
                    <LeftBar user={props.user} setUser={props.setUser} calendars={calendars} calendarsLoaded={calendarsLoaded} />

                    <Calendar user={props.user} setUser={props.setUser} calendars={calendars} calendarsLoaded={calendarsLoaded} />
                </div>
            );
        }
    }
};

export default CalendarMain;
