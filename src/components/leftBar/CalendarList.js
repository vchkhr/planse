import React from 'react';

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
                <div className="text-center">
                    <p>Loading calendars...</p>
                </div>
            );
        }
        else {
            let calendarsList = props.calendars.map((calendar) => {
                return <CalendarEntry key={calendar.id} calendar={calendar} user={props.user} />
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
