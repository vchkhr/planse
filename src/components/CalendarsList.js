import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

export const CalendarsList = (props) => {
    const [calendars, setCalendars] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);

        fetch(process.env.REACT_APP_DOMAIN + '/api/calendar/' + props.mainCalendar, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
            .then(
                response => {
                    if (response.ok) {
                        return response;
                    }
                    else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
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
                console.log(response);
                setLoading(false);
            })
            .catch(error => {
                console.log("User Request error:");
                console.log(error);
                setLoading(false);
            });
    }

    if (loading) {
        return (
            <div>Loading Calendars...</div>
        );
    }
    else {
        return (
            <div>
                {calendars.name}
            </div>
        );
    }
};

export default CalendarsList;
