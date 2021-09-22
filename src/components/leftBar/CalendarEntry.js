import React from 'react';

import { Link } from 'react-router-dom';

export const CalendarEntry = (props) => {
    let mainCalendarText = (
        <span></span>
    );

    if (props.user.main_calendar === props.calendar.id) {
        mainCalendarText = (
            <i className="bi bi-star text-gray" title="This is your default calendar"></i>
        );
    }

    return (
        <div className="d-flex calendar-entry">
            <p className="mt-0 mb-0 flex-fill">
                <i className={"bi bi-check-square-fill calendar-color-" + props.calendar.color} title="Show or hide this calendar"></i> {props.calendar.name} 
            </p>
            
            <p className="mt-0 mb-0">
                <span className="pr-3">{mainCalendarText} </span>
                <span><Link to={"/calendar/edit/" + props.calendar.id} className="link-hidden link-gray"><i className="bi bi-gear" title="Edit this calendar"></i></Link> </span>
            </p>
        </div>
    );
};

export default CalendarEntry;


