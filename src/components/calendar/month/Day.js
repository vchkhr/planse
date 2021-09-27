import React from 'react';

import moment from 'moment';
import { ChevronCompactRight } from 'react-bootstrap-icons';
import { Spinner } from 'react-bootstrap';


export const Day = (props) => {
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
        const week = parseInt(props.week, 10);
        const day = parseInt(props.day, 10);
        const firstDay = props.firstDay;
        const firstDayDate = parseInt(props.firstDayDate, 10);

        let dayDate = moment(firstDay).add(day - firstDayDate + week * 7, "days");

        let cn = "dayNum mt-0 mb-0"
        if (dayDate.format("MM") !== props.viewDate.format("MM")) {
            cn = "dayNum text-secondary"
        }

        let events = []

        props.events.forEach((event) => {
            let color = event.color;
            if (color === null) {
                props.calendars.forEach((calendar) => {
                    if (calendar.id === event.calendar_id) {
                        color = calendar.color;
                    }
                });
            }
            if (event.all_day === 1 || moment(event.end).diff(moment(event.start), "days") > 0) {
                color = "calendar-color-" + color + " calendar-background-color-" + color;
            }
            else {
                color = "calendar-color-" + color;
            }

            if (dayDate.isBetween(moment(event.start), moment(event.end), 'days', '[]') === true) {
                if (event.all_day === 1 || moment(event.end).diff(dayDate, "days") > 0) {
                    let multipleDays = (
                        <span title="This event does not end today"><ChevronCompactRight /></span>
                    );
                    if (moment(event.end).diff(dayDate, "days") === 0) {
                        multipleDays = (
                            <span></span>
                        );
                    }

                    events.push(
                        <div className={"arrangement arrangement-allDay d-flex " + color}>
                            <p className="flex-fill eventName">{event.name}</p>
                            <p>{multipleDays}</p>
                        </div>
                    );
                }
                else {
                    events.push(
                        <div className={"arrangement arrangement-timeSpecific d-flex " + color}>
                            <p className="flex-fill eventName">{event.name}</p>
                            <p>{moment(event.end).format("H:mm")}</p>
                        </div>
                    );
                }
            }
        });

        return (
            <div>
                <p className={cn}>{dayDate.format('D')}</p>

                <div className="fw-bold">
                    {events}
                </div>
            </div>
        );
    }
};

export default Day;
