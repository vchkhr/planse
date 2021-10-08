import moment from 'moment';
import React from 'react';

import { Modal } from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';
import { Bell, CalendarEvent, ChevronLeft, Sticky } from 'react-bootstrap-icons';


export const CreateEvent = (props) => {
    const setDate = () => {
        props.setShowEventModal(false);
        props.setCalendarSelectedDate(moment(props.event.split('day-')[1].split(' ')[0], "DD-MM-YYYY"));
    }

    return (
        <Modal show={true} onHide={() => props.setShowEventModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="formCard">
                    <p className="text-center">
                        <img className="mb-4" src="/logo.png" alt="PLANSE" />
                    </p>

                    <h1 className="h3 mb-3 fw-normal text-center">Create event</h1>

                    <Button variant="primary" size="lg" className="w-100 mt-3" onClick={() => { props.setShowArrangementModal(true); setDate() }}><CalendarEvent /> Arrangement</Button>

                    <Button variant="outline-primary" size="lg" className="w-100 mt-3" onClick={() => { props.setShowReminderModal(true); setDate() }}><Bell /> Reminder</Button>

                    <Button variant="outline-primary" size="lg" className="w-100 mt-3" disabled><Sticky /> Task</Button>
                    
                    <Button variant="outline-secondary" className="w-100 mt-3" onClick={() => props.setShowEventModal(false)}><ChevronLeft />Go back to Calendar</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateEvent;
