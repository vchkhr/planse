import React from 'react';
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
                {props.week.map((day) => (
                    <div className="day" key={day}>
                        <Day week={props.index} day={day} key={day} firstDay={props.firstDay} firstDayDate={props.firstDayDate} viewDate={props.viewDate} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} eventsLoaded={props.eventsLoaded} events={props.events} />
                    </div>
                ))}
            </>
        );
    }
};

export default Week;
