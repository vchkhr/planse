import React from 'react';

import moment from 'moment';
import { Spinner } from 'react-bootstrap';
import { Day } from '../month/Day';


export const Week = (props) => {
    if (props.userLoaded === false || props.calendarsLoaded === false || props.eventsLoaded === false) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="grow" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }
    else {
        return (
            <>
                {props.week.map((day) => {
                    const week = parseInt(props.index, 10);
                    const firstDay = props.firstDay;
                    const firstDayDate = parseInt(props.firstDayDate, 10);

                    let dayDate = moment(firstDay).add(day - firstDayDate + week * 7, "days");

                    let today = "";
                    if (dayDate.format("DD MM YYYY") === moment().format("DD MM YYYY")) {
                        today = "today"
                    }

                    return (
                        <div className={"day day-" + dayDate.format("DD-MM-YYYY") + " " + today} key={day} onClick={(e) => { props.setShowEventModal(e) }}>
                            <Day day={day} key={day} dayDate={dayDate} today={today} viewDate={props.viewDate} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} eventsLoaded={props.eventsLoaded} events={props.events} showEventModal={props.showEventModal} setShowEventModal={props.setShowEventModal} showAllDayEvents={props.showAllDayEvents} showTimeSpecificEvents={props.showTimeSpecificEvents} showArrangements={props.showArrangements} showReminders={props.showReminders} showTasks={props.showTasks} />
                        </div>
                    )
                })}
            </>
        );
    }
};

export default Week;
