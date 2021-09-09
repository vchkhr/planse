import React, { useEffect, useState } from 'react';

export const CalendarList = (props) => {
    const [calendars, setCalendars] = useState('');
    const [calendarsLoading, setCalendarsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setCalendarsLoading(true);

        fetch(process.env.REACT_APP_DOMAIN + '/api/calendar/' + props.user.main_calendar, {
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
                setCalendarsLoading(false);
            })
            .catch(error => {
                console.log("Calendars Request error:");
                console.log(error);
            });
    }

    if (props.userLoading === true) {
        return (
            <div>

            </div>
        );
    }
    else {
        if (calendarsLoading) {
            return (
                <div>Loading Calendars...</div>
            );
        }
        else {
            return (
                <div>
                    {/* <i className="bi bi-square"></i> */}
                    <i className={"bi bi-check-square-fill calendar-color-" + calendars.color}></i> {calendars.name}
                </div>
            );
        }
    }
};

export default CalendarList;
