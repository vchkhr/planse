import React from 'react';

import moment from 'moment';


export const Day = (props) => {
    if (props.userLoaded === false) {
        return (
            <div className="text-center mt-5">
                <p>Loading user information...</p>
            </div>
        );
    }
    else if (props.calendarsLoaded === false) {
        return (
            <div className="text-center mt-5">
                <p>Loading calendars information...</p>
            </div>
        );
    }
    else if (props.eventsLoaded === false) {
        return (
            <div className="text-center mt-5">
                <p>Loading events information...</p>
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
            cn = "dayNum color-light-gray"
        }

        let events = []

        props.events.map((event) => {
            let color = event.color;
            if (color === null) {
                props.calendars.map((calendar) => {
                    if (calendar.id, event.calendar_id) {
                        color = calendar.color;
                    }
                });
            }

            if (dayDate.isBetween(moment(event.start), moment(event.end), 'days', '[]') === true) {
                if (event.all_day === 1) {
                    events.push(
                        <div className="arrangement arrangement-allDay">
                            <p className={"calendar-color-" + color + " calendar-background-color-" + color}>{event.name}</p>
                        </div>
                    );
                }
                else {
                    events.push(
                        <div className="arrangement arrangement-timeSpecific">
                            <p className={"calendar-color-" + color}>{event.name}</p>
                        </div>
                    );
                }
            }
        });

        return (
            <div>
                <p className={cn}>{dayDate.format('D')}</p>

                <div className="text-bold">
                    {events}
                </div>
            </div>
        );
    }
};

export default Day;