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

    const [events, setEvents] = useState([]);
    const [eventsLoaded, setEventsLoaded] = useState(false);

    const [showAllDayEvents, setShowAllDayEvents] = useState(true);
    const [showTimeSpecificEvents, setShowTimeSpecificEvents] = useState(true);

    const [showArrangements, setShowArrangements] = useState(true);
    const [showReminders, setShowReminders] = useState(true);
    const [showTasks, setShowTasks] = useState(true);

    const isMobile = useMediaQuery({ query: `(max-width: 850px)` });

    useEffect(() => {
        fetchCalendars();
        updateEvents();
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

    const updateEvents = () => {
        setEventsLoaded(false);

        fetch(process.env.REACT_APP_DOMAIN + '/api/events', {
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
                setEvents(response);
                setEventsLoaded(true);
            })
            .catch(error => {
                // alert(error);
            });
    }

    if (redirectToLogin) {
        return <Redirect to="/login" />;
    }

    if (isMobile === true) { // && process.env.REACT_APP_DOMAIN !== "http://localhost:8000") {
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
                    <LeftBar user={props.user} setUser={props.setUser} calendars={calendars} calendarsLoaded={calendarsLoaded} updateEvents={updateEvents} showAllDayEvents={showAllDayEvents} setShowAllDayEvents={setShowAllDayEvents} showTimeSpecificEvents={showTimeSpecificEvents} setShowTimeSpecificEvents={setShowTimeSpecificEvents} showArrangements={showArrangements} showReminders={showReminders} showTasks={showTasks} setShowArrangements={setShowArrangements} setShowReminders={setShowReminders} setShowTasks={setShowTasks} />

                    <Calendar user={props.user} setUser={props.setUser} calendars={calendars} calendarsLoaded={calendarsLoaded} showAllDayEvents={showAllDayEvents} showTimeSpecificEvents={showTimeSpecificEvents} updateEvents={updateEvents} events={events} eventsLoaded={eventsLoaded} showArrangements={showArrangements} showReminders={showReminders} showTasks={showTasks} />
                </div>
            );
        }
    }
};

export default CalendarMain;
