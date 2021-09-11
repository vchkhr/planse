import React from 'react';

export const CalendarEntry = (props) => {
    return (
        <p className="mt-0 mb-0">
            <i className={"bi bi-check-square-fill calendar-color-" + props.calendar.color}></i> {props.calendar.name}
        </p>
    );
};

export default CalendarEntry;


