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

    let changeShowArrangements = () => {
        props.setShowArrangements(!props.showArrangements);
        props.updateEvents();
    }

    let changeShowReminders = () => {
        props.setShowReminders(!props.showReminders);
        props.updateEvents();
    }

    let changeShowTasks = () => {
        props.setShowTasks(!props.showTasks);
        props.updateEvents();
    }

    return (
        <div>
            <div className="d-flex calendar-entry">
                <p className="mt-0 mb-0 flex-fill text-muted">
                    All day events
                </p>

                <Form className="mt-0 mb-0">
                    <Form.Check type="switch" id="showAllDayEvents" aria-label="All day events" defaultChecked={props.showAllDayEvents} onChange={() => changeShowAllDayEvents()} />
                </Form>
            </div>

            <div className="d-flex calendar-entry">
                <p className="mt-0 mb-0 flex-fill text-muted">
                    Time-specific events
                </p>

                <Form className="mt-0 mb-0">
                    <Form.Check type="switch" id="showTimeSpecificEvents" aria-label="Time-specific events" defaultChecked={props.showTimeSpecificEvents} onChange={() => changeShowTimeSpecificEvents()} />
                </Form>
            </div>

            <div className="d-flex calendar-entry">
                <p className="mt-0 mb-0 flex-fill text-muted">
                    Arrangements
                </p>

                <Form className="mt-0 mb-0">
                    <Form.Check type="switch" id="showArrangements" aria-label="Arrangements" defaultChecked={props.showArrangements} onChange={() => changeShowArrangements()} />
                </Form>
            </div>

            <div className="d-flex calendar-entry">
                <p className="mt-0 mb-0 flex-fill text-muted">
                    Reminders
                </p>

                <Form className="mt-0 mb-0">
                    <Form.Check type="switch" id="showReminders" aria-label="Reminders" defaultChecked={props.showReminders} onChange={() => changeShowReminders()} />
                </Form>
            </div>

            <div className="d-flex calendar-entry">
                <p className="mt-0 mb-0 flex-fill text-muted">
                    Tasks
                </p>

                <Form className="mt-0 mb-0">
                    <Form.Check type="switch" id="showTasks" aria-label="Tasks" defaultChecked={props.showTasks} onChange={() => changeShowTasks()} />
                </Form>
            </div>
        </div>
    );
};

export default EventsTypeSelector;


