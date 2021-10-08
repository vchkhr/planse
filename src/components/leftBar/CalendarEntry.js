import React from 'react';
import { CheckSquareFill, Gear, Square, Star } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';


export const CalendarEntry = (props) => {
    let setVisibleCalendar = (id) => {
        const visible = props.calendar.visible === 1 ? 0 : 1;

        fetch(process.env.REACT_APP_DOMAIN + '/api/calendar/edit/' + id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                visible
            })
        })
            .then(
                response => {
                    if (response.ok) {
                        return response;
                    }
                    else {
                        let error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;

                        throw error;
                    }
                },
                error => {
                    throw error;
                }
            )
            .then(response => response.json())
            .then(response => {
                props.fetchCalendars();
            })
            .catch(error => {
                alert(error);
                props.fetchCalendars();
            });
    }

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
                    <Link to="#" className="color-inherit" onClick={() => setVisibleCalendar(props.calendar.id)}>{props.calendar.visible === 1 ? <CheckSquareFill /> : <Square />}</Link> {props.calendar.name}
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


