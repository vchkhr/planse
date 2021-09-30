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
        let dayDate = props.dayDate;

        let cn = "dayNum mt-0 mb-0"
        if (dayDate.format("MM") !== props.viewDate.format("MM")) {
            cn = "dayNum text-secondary"
        }

        let events = []

        props.events.forEach((event) => {
            let visible = props.calendars.filter((calendar) => calendar.id === event.calendar_id)[0].visible;
            if (visible === 0) {
                return;
            }

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
                        <span title="This event does not end today" className={"arrangement-" + event.id}><ChevronCompactRight className={"arrangement-" + event.id} /></span>
                    );
                    if (moment(event.end).diff(dayDate, "days") === 0) {
                        multipleDays = (
                            <span className={"arrangement-" + event.id}></span>
                        );
                    }

                    events.push(
                        <div className={"arrangement arrangement-allDay " + color + " arrangement-" + event.id} key={event.id} onClick={(e) => { props.setShowEventModal(e) }}>
                            <p className={"name arrangement-" + event.id}>{event.name}</p>
                            <p className={"info arrangement-" + event.id}>{multipleDays}</p>
                        </div>
                    );
                }
                else {
                    events.push(
                        <div className={"arrangement arrangement-timeSpecific " + color + " arrangement-" + event.id} key={event.id} onClick={(e) => { props.setShowEventModal(e) }}>
                            <p className={"name arrangement-" + event.id}>{event.name}</p>
                            <p className={"info arrangement-" + event.id}>{moment(event.end).format("H:mm")}</p>
                        </div>
                    );
                }
            }
        });

        return (
            <div>
                <p className={cn + " " + props.today + " day-" + dayDate.format("DD-MM-YYYY")}>{dayDate.format('D')} {props.today === "" ? "" : " — Today"}</p>

                <div>
                    {events}
                </div>
            </div>
        );
    }
};

export default Day;
