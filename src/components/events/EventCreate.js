import React from 'react';
import { Form } from 'react-bootstrap';
import { Bell, CalendarEvent, ChevronLeft, Sticky } from 'react-bootstrap-icons';

import { Link } from 'react-router-dom';


const EventCreate = (props) => {
    return (
        <Form className="formCard">
            <p className="text-center">
                <img className="mb-4" src="/logo.png" alt="PLANSE" />
            </p>

            <h1 className="h3 mb-3 fw-normal text-center">Create event</h1>

            <Link to="/arrangement/create" className="w-100 btn btn-lg btn-primary mt-3"><CalendarEvent /> Arrangement</Link>
            <Link to="/reminder/create" className="w-100 btn btn-lg btn-outline-primary mt-3"><Bell /> Reminder</Link>
            <Link to="/task/create" className="w-100 btn btn-lg btn-outline-primary mt-3"><Sticky /> Task</Link>
            <Link to="/" className="btn btn-outline-secondary w-100 mt-3"><ChevronLeft />Go back to Calendar</Link>
        </Form>
    );
};

export default EventCreate;
