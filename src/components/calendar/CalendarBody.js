import React, { useEffect, useState } from 'react';

import { MonthView } from '../calendar/month/MonthView';


export const CalendarBody = (props) => {
    if (props.userLoaded === false) {
        return (
            <div className="text-center mt-5">
                <p>Loading user information...</p>
            </div>
        );
    }
    else if (props.calendarsLoaded !== true) {
        return (
            <div className="text-center mt-5">
                <p>Loading calendars...</p>
            </div>
        );
    }
    else {
        const [events, setEvents] = useState([]);
        const [eventsLoaded, setEventsLoaded] = useState(false);

        useEffect(() => {
            fetchData();
        }, []);

        const fetchData = () => {
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

        if (props.view === 'week') {
            return (
                <MonthView viewDate={props.viewDate} events={events} eventsLoaded={eventsLoaded} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} />
            );
        }
        else if (props.view === 'month') {
            return (
                <MonthView viewDate={props.viewDate} events={events} eventsLoaded={eventsLoaded} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} />
            );
        }
        else if (props.view === 'year') {
            return (
                <MonthView viewDate={props.viewDate} events={events} eventsLoaded={eventsLoaded} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} />
            );
        }
    }
};

export default CalendarBody;
