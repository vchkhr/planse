import React from 'react';
import { CheckSquareFill, Gear, Star } from 'react-bootstrap-icons';

import { Link } from 'react-router-dom';

export const CalendarEntry = (props) => {
    let mainCalendarText = (
        <span></span>
    );

    if (props.user.main_calendar === props.calendar.id) {
        mainCalendarText = (
            <span className="text-secondary" title="This is your main calendar">
                <Star />
            </span>
        );
    }

    return (
        <div className="d-flex calendar-entry">
            <p className="mt-0 mb-0 flex-fill">
                <span className={"calendar-color-" + props.calendar.color} title="Show or hide this calendar">
                    <CheckSquareFill /> {props.calendar.name}
                </span>
            </p>

            <p className="mt-0 mb-0">
                <span className="pr-3">{mainCalendarText} </span>
                <span>
                    <Link to={"/calendar/edit/" + props.calendar.id} className="text-decoration-none text-secondary" title="Edit this calendar">
                        <Gear />
                    </Link>
                </span>
            </p>
        </div>
    );
};

export default CalendarEntry;


