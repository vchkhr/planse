import React from 'react';
import { Spinner } from 'react-bootstrap';

import { CalendarEntry } from './CalendarEntry';

export const CalendarList = (props) => {

    if (props.userLoaded === false) {
        return (
            <div>

            </div>
        );
    }
    else {
        if (props.calendarsLoaded !== true) {
            return (
                <div className="text-center mt-5">
                <Spinner animation="grow" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
            );
        }
        else {
            let calendarsList = props.calendars.map((calendar) => {
                return <CalendarEntry key={calendar.id} calendar={calendar} user={props.user} fetchCalendars={props.fetchCalendars} />
            })

            return (
                <div>
                    {calendarsList}
                </div>
            );
        }
    }
};

export default CalendarList;
