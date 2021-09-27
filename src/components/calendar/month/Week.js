import React from 'react';
import { Spinner } from 'react-bootstrap';

import moment from 'moment';
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

                    console.log(today)

                    return (
                        <div className={"day day-" + day + " " + today} key={day}>
                            <Day day={day} key={day} dayDate={dayDate} today={today} viewDate={props.viewDate} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} eventsLoaded={props.eventsLoaded} events={props.events} />
                        </div>
                    )
                })}
            </>
        );
    }
};

export default Week;
