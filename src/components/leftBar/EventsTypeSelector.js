import React from 'react';
import { Form } from 'react-bootstrap';


export const EventsTypeSelector = (props) => {
    let changeShowAllDayEvents = () => {
        props.setShowAllDayEvents(!props.showAllDayEvents);
        props.updateEvents();
    }

    let changeShowTimeSpecificEvents = () => {
        props.setShowTimeSpecificEvents(!props.showTimeSpecificEvents);
        props.updateEvents();
    }

    return (
        <div>
            <div className="d-flex calendar-entry">
                <p className="mt-0 mb-0 flex-fill text-muted">
                    Show all day events
                </p>
                <p className="mt-0 mb-0">
                    <Form>
                        <Form.Check type="switch" id="showAllDayEvents" aria-label="Show all day events" defaultChecked={props.showAllDayEvents} onChange={() => changeShowAllDayEvents()} />
                    </Form>
                </p>
            </div>

            <div className="d-flex calendar-entry">
                <p className="mt-0 mb-0 flex-fill text-muted">
                    Show time-specific events
                </p>
                <p className="mt-0 mb-0">
                    <Form>
                        <Form.Check type="switch" id="showTimeSpecificEvents" aria-label="Show time-specific events" defaultChecked={props.showTimeSpecificEvents} onChange={() => changeShowTimeSpecificEvents()} />
                    </Form>
                </p>
            </div>
        </div>
    );
};

export default EventsTypeSelector;


