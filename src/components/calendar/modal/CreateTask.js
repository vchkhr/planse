import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { Modal } from 'react-bootstrap';
import { Button, Form, Spinner } from 'react-bootstrap';
import { ChevronLeft, PlusCircleDotted } from 'react-bootstrap-icons';


export const CreateTask = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [calendarSelectedDate] = useState(props.calendarSelectedDate === false ? moment() : props.calendarSelectedDate);

    const [startDate, setStartDate] = useState(calendarSelectedDate.format("YYYY-MM-DD"));
    const [isDone] = useState(false);

    const [calendar, setCalendar] = useState(props.user.main_calendar);
    const [color, setColor] = useState('');

    const [calendars, setCalendars] = useState('');
    const [calendarsLoaded, setCalendarsLoaded] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const taskCreate = (e) => {
        e.preventDefault();

        const is_done = isDone;
        const calendar_id = calendar;

        let start = startDate + " 00:00:00";

        fetch(process.env.REACT_APP_DOMAIN + '/api/task/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                name,
                description,
                start,
                is_done,
                calendar_id,
                color
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
                props.setShowTaskModal(false);
                props.updateEvents();
            })
            .catch(error => {
                alert(error);
                props.setShowTaskModal(false);
            });
    }

    const fetchData = () => {
        setCalendarsLoaded(false);

        fetch(process.env.REACT_APP_DOMAIN + '/api/calendar/index', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
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
                setCalendars(response);
                setCalendarsLoaded(true);
            })
            .catch(error => {
                alert(error);
            });
    }

    if (calendarsLoaded === false) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="grow" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }
    else {
        let calendarsList = calendars.map((calendar) => {
            return (
                <option value={calendar.id} key={calendar.id}>{calendar.name} {calendar.id === props.user.main_calendar ? '(Main)' : ''}</option>
            );
        })

        return (
            <Modal show={true} onHide={() => props.setShowTaskModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={taskCreate}>
                        <Form.Floating controlid="formName">
                            <Form.Control type="text" className="top" placeholder="Name" onChange={e => setName(e.target.value)} required />
                            <Form.Label>Name *</Form.Label>
                        </Form.Floating>

                        <Form.Floating controlid="formDescription">
                            <Form.Control type="text" className="bottom" placeholder="Description" onChange={e => setDescription(e.target.value)} />
                            <Form.Label>Description</Form.Label>
                        </Form.Floating>

                        <Form.Floating controlid="formStartDate" className="mt-3">
                            <Form.Control type="date" className="top" placeholder="Start Date *" onChange={e => setStartDate(e.target.value)} defaultValue={startDate} required />
                            <Form.Label>Date *</Form.Label>
                        </Form.Floating>

                        <Form.Floating controlid="formCalendar" className="mt-3">
                            <Form.Select className="top" aria-label="Calendar *" onChange={e => setCalendar(e.target.value)} defaultValue={props.user.main_calendar} >
                                {calendarsList}
                            </Form.Select>
                            <Form.Label>Calendar *</Form.Label>
                        </Form.Floating>

                        <Form.Floating controlid="formColor">
                            <Form.Select className="bottom" aria-label="Color *" onChange={e => setColor(e.target.value)} defaultValue="" >
                                <option value="0">Color of calendar</option>
                                <option value="1">&#x1F33A; Red</option>
                                <option value="2">&#x1F3C0; Orange</option>
                                <option value="3">&#x2600;&#xFE0F; Yellow</option>
                                <option value="4">&#x1F966; Green</option>
                                <option value="5">&#x1F40B; Blue</option>
                                <option value="6">&#x1F47E; Purple</option>
                            </Form.Select>
                            <Form.Label>Color *</Form.Label>
                        </Form.Floating>

                        <Button variant="primary" type="submit" size="lg" className="w-100 mt-3"><PlusCircleDotted /> Create task</Button>
                        <Button variant="outline-secondary" className="w-100 mt-3" onClick={() => props.setShowTaskModal(false)}><ChevronLeft />Go back to Calendar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
};

export default CreateTask;
