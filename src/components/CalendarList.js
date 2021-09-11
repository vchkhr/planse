import React, { useEffect, useState } from 'react';

import { CalendarEntry } from './CalendarEntry';

export const CalendarList = (props) => {
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
            });
    }

    if (props.userLoading === true) {
        return (
            <div>

            </div>
        );
    }
    else {
        if (calendarsLoaded === false) {
            return (
                <div>Loading Calendars...</div>
            );
        }
        else {
            let calendarsText = calendars.map((calendar) => {
                return <CalendarEntry key={calendar.id} calendar={calendar} />
            })

            return (
                <div>
                    {calendarsText}
                </div>
            );
        }
    }
};

export default CalendarList;
