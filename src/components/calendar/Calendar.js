import React, { useEffect, useState } from 'react';

import { Redirect } from "react-router-dom";

import moment from 'moment';

import { TopNav } from '../calendar/TopNav';
import { CalendarBody } from '../calendar/CalendarBody';
import { Welcome } from '../account/Welcome';
import { Spinner } from 'react-bootstrap';
import CreateEvent from './modal/CreateEvent';
import CreateArrangement from './modal/CreateArrangement';


export const Calendar = (props) => {
    const [redirectToLogin] = useState(false);
    const [view, setView] = useState('month');
    const [viewDate, setViewDate] = useState(moment());

    const [events, setEvents] = useState([]);
    const [eventsLoaded, setEventsLoaded] = useState(false);

    const [calendarSelectedDate, setCalendarSelectedDate] = useState(false)
    const [showEventModal, setShowEventModal] = useState(false);
    const [showArrangementModal, setShowArrangementModal] = useState(false);

    useEffect(() => {
        updateEvents();
    }, []);

    const updateEvents = () => {
        setEventsLoaded(false);

        fetch(process.env.REACT_APP_DOMAIN + '/api/user/arrangements', {
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

    let createEvent = (
        <div></div>
    );

    if (showEventModal.target) {
        let event = showEventModal.target.classList.value;
        if (event.indexOf('day-') > 0) {
            createEvent = (
                <CreateEvent showEventModal={showEventModal} setShowEventModal={setShowEventModal} setShowArrangementModal={setShowArrangementModal} event={event} setCalendarSelectedDate={setCalendarSelectedDate} />
            );
        }
        else if (event.indexOf('arrangement-') > 0) {
            // let arrangement = event.split('arrangement-')[1].split(' ')[0];
        }
    }

    let createArrangement = (
        <div></div>
    );

    if (showArrangementModal === true) {
        createArrangement = (
            <CreateArrangement showArrangementModal={showArrangementModal} setShowArrangementModal={setShowArrangementModal} user={props.user} userLoaded={props.userLoaded} calendarSelectedDate={calendarSelectedDate} updateEvents={updateEvents} />
        );
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
                <div className="calendar">
                    {createEvent}
                    {createArrangement}

                    <TopNav user={props.user} userLoaded={props.userLoaded} view={view} setView={setView} viewDate={viewDate} setViewDate={setViewDate} />

                    <CalendarBody user={props.user} userLoaded={props.userLoaded} view={view} viewDate={viewDate} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} showEventModal={showEventModal} setShowEventModal={setShowEventModal} events={events} eventsLoaded={eventsLoaded} />
                </div>
            );
        }
    }
};

export default Calendar;
