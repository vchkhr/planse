import React from 'react';
import { Spinner } from 'react-bootstrap';

import { AgendaView } from '../calendar/agenda/AgendaView';
import { MonthView } from '../calendar/month/MonthView';
import { YearView } from '../calendar/year/YearView';


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
        if (props.view === 'agenda') {
            return (
                <AgendaView user={props.user} events={props.events} eventsLoaded={props.eventsLoaded} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} showEventModal={props.showEventModal} setShowEventModal={props.setShowEventModal} showAllDayEvents={props.showAllDayEvents} showTimeSpecificEvents={props.showTimeSpecificEvents} showArrangements={props.showArrangements} showReminders={props.showReminders} showTasks={props.showTasks} view={props.view} setView={props.setView} viewDate={props.viewDate} setViewDate={props.setViewDate} />
            );
        }
        else if (props.view === 'month') {
            return (
                <MonthView user={props.user} viewDate={props.viewDate} events={props.events} eventsLoaded={props.eventsLoaded} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} showEventModal={props.showEventModal} setShowEventModal={props.setShowEventModal} showAllDayEvents={props.showAllDayEvents} showTimeSpecificEvents={props.showTimeSpecificEvents} showArrangements={props.showArrangements} showReminders={props.showReminders} showTasks={props.showTasks} />
            );
        }
        else if (props.view === 'year') {
            return (
                <YearView user={props.user} events={props.events} eventsLoaded={props.eventsLoaded} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} showEventModal={props.showEventModal} setShowEventModal={props.setShowEventModal} showAllDayEvents={props.showAllDayEvents} showTimeSpecificEvents={props.showTimeSpecificEvents} showArrangements={props.showArrangements} showReminders={props.showReminders} showTasks={props.showTasks} view={props.view} setView={props.setView} viewDate={props.viewDate} setViewDate={props.setViewDate} />
            );
        }
    }
};

export default CalendarBody;
