import React from 'react';

import moment from 'moment';
import { ArrowRightShort, Bell } from 'react-bootstrap-icons';
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
            if (parseInt(color) === 0) {
                props.calendars.forEach((calendar) => {
                    if (calendar.id === event.calendar_id) {
                        color = calendar.color;
                    }
                });
            }

            if (event.type === "arrangement") {
                let start = moment(event.start);
                let end = moment(event.end);

                if (event.all_day === 1 || end.diff(start, "days") > 0) {
                    color = "calendar-color-" + color + " calendar-background-color-" + color;
                }
                else {
                    color = "calendar-color-" + color;
                }

                if (dayDate.isBetween(start, end, 'days', '[]') === true) {
                    if (event.all_day === 0 && props.showTimeSpecificEvents === true) {
                        // Events with start or end time
                        if (start.format("DD-MM-YYYY") === end.format("DD-MM-YYYY")) {
                            // Single day events
                            let startText = start.format("mm") === "00" ? start.format("HH") : start.format("HH:mm");
                            let endText = end.format("mm") === "00" ? end.format("HH") : end.format("HH:mm");

                            events.push(
                                <div className={"arrangement arrangement-timeSpecific " + color + " arrangement-" + event.id} key={event.id} onClick={(e) => { props.setShowEventModal(e) }}>
                                    <p className={"name arrangement-" + event.id}>{event.name}</p>
                                    <p className={"info arrangement-" + event.id}>{startText}<ArrowRightShort />{endText}</p>
                                </div>
                            );
                        }
                        else {
                            // Multiple day events
                            if (start.format("DD-MM-YYYY") === dayDate.format("DD-MM-YYYY")) {
                                // First day
                                let startText = start.format("mm") === "00" ? start.format("HH") : start.format("HH:mm");

                                events.push(
                                    <div className={"arrangement arrangement-timeSpecific " + color + " arrangement-" + event.id} key={event.id} onClick={(e) => { props.setShowEventModal(e) }}>
                                        <p className={"name arrangement-" + event.id}>{event.name}</p>
                                        <p className={"info arrangement-" + event.id}>{startText}<ArrowRightShort /></p>
                                    </div>
                                );
                            }
                            else if (end.format("DD-MM-YYYY") === dayDate.format("DD-MM-YYYY")) {
                                // Intermediate day
                                let endText = end.format("mm") === "00" ? end.format("HH") : end.format("HH:mm");

                                events.push(
                                    <div className={"arrangement arrangement-timeSpecific " + color + " arrangement-" + event.id} key={event.id} onClick={(e) => { props.setShowEventModal(e) }}>
                                        <p className={"name arrangement-" + event.id}>{event.name}</p>
                                        <p className={"info arrangement-" + event.id}><ArrowRightShort />{endText}</p>
                                    </div>
                                );
                            }
                            else {
                                // Last day
                                events.push(
                                    <div className={"arrangement arrangement-timeSpecific " + color + " arrangement-" + event.id} key={event.id} onClick={(e) => { props.setShowEventModal(e) }}>
                                        <p className={"name arrangement-" + event.id}>{event.name}</p>
                                        <p className={"info arrangement-" + event.id}><ArrowRightShort /></p>
                                    </div>
                                );
                            }
                        }
                    }
                    else if (event.all_day === 1 && props.showAllDayEvents === true) {
                        // All day events
                        if (start.format("DD-MM-YYYY") === end.format("DD-MM-YYYY")) {
                            // Single day events
                            events.push(
                                <div className={"arrangement arrangement-timeSpecific " + color + " arrangement-" + event.id} key={event.id} onClick={(e) => { props.setShowEventModal(e) }}>
                                    <p className={"name arrangement-" + event.id}>{event.name}</p>
                                    <p className={"info arrangement-" + event.id}></p>
                                </div>
                            );
                        }
                        else {
                            // Multiple day events
                            if (end.format("DD-MM-YYYY") === dayDate.format("DD-MM-YYYY")) {
                                // Last day
                                events.push(
                                    <div className={"arrangement arrangement-timeSpecific " + color + " arrangement-" + event.id} key={event.id} onClick={(e) => { props.setShowEventModal(e) }}>
                                        <p className={"name arrangement-" + event.id}>{event.name}</p>
                                        <p className={"info arrangement-" + event.id}></p>
                                    </div>
                                );
                            }
                            else {
                                // First or Intermediate day
                                events.push(
                                    <div className={"arrangement arrangement-timeSpecific " + color + " arrangement-" + event.id} key={event.id} onClick={(e) => { props.setShowEventModal(e) }}>
                                        <p className={"name arrangement-" + event.id}>{event.name}</p>
                                        <p className={"info arrangement-" + event.id}><ArrowRightShort /></p>
                                    </div>
                                );
                            }
                        }
                    }
                }
            }
            else if (event.type === "reminder") {
                let start = moment(event.start);

                if (event.all_day === 1) {
                    color = "calendar-color-" + color + " calendar-background-color-" + color;
                }
                else {
                    color = "calendar-color-" + color;
                }

                if (dayDate.isBetween(start, start, 'days', '[]') === true) {
                    if (event.all_day === 0 && props.showTimeSpecificEvents === true) {
                        // Events with start or end time
                        let startText = start.format("mm") === "00" ? start.format("HH") : start.format("HH:mm");

                        events.push(
                            <div className={"reminder reminder-timeSpecific " + color + " reminder-" + event.id} key={event.id} onClick={(e) => { props.setShowEventModal(e) }}>
                                <p className={"name reminder-" + event.id}><Bell /> {event.name}</p>
                                <p className={"info reminder-" + event.id}>{startText}</p>
                            </div>
                        );
                    }
                    else if (event.all_day === 1 && props.showAllDayEvents === true) {
                        // All day events
                        events.push(
                            <div className={"reminder reminder-timeSpecific " + color + " reminder-" + event.id} key={event.id} onClick={(e) => { props.setShowEventModal(e) }}>
                                <p className={"name reminder-" + event.id}><Bell /> {event.name}</p>
                                <p className={"info reminder-" + event.id}></p>
                            </div>
                        );
                    }
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
