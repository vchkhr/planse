import React from 'react';
import { Spinner } from 'react-bootstrap';

import { MonthView } from '../calendar/month/MonthView';


export const CalendarBody = (props) => {
    if (props.userLoaded === false || props.calendarsLoaded !== true) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="grow" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }
    else {
        if (props.view === 'week') {
            return (
                <MonthView user={props.user} viewDate={props.viewDate} events={props.events} eventsLoaded={props.eventsLoaded} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} showEventModal={props.showEventModal} setShowEventModal={props.setShowEventModal} showAllDayEvents={props.showAllDayEvents} showTimeSpecificEvents={props.showTimeSpecificEvents} />
            );
        }
        else if (props.view === 'month') {
            return (
                <MonthView user={props.user} viewDate={props.viewDate} events={props.events} eventsLoaded={props.eventsLoaded} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} showEventModal={props.showEventModal} setShowEventModal={props.setShowEventModal} showAllDayEvents={props.showAllDayEvents} showTimeSpecificEvents={props.showTimeSpecificEvents} />
            );
        }
        else if (props.view === 'year') {
            return (
                <MonthView user={props.user} viewDate={props.viewDate} events={props.events} eventsLoaded={props.eventsLoaded} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} showEventModal={props.showEventModal} setShowEventModal={props.setShowEventModal} showAllDayEvents={props.showAllDayEvents} showTimeSpecificEvents={props.showTimeSpecificEvents} />
            );
        }
    }
};

export default CalendarBody;
