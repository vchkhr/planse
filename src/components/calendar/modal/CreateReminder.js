import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { Modal } from 'react-bootstrap';
import { Button, ButtonGroup, Form, Spinner } from 'react-bootstrap';
import { ChevronLeft, PlusCircleDotted } from 'react-bootstrap-icons';


export const CreateReminder = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [calendarSelectedDate] = useState(props.calendarSelectedDate === false ? moment() : props.calendarSelectedDate);

    const [startDate, setStartDate] = useState(calendarSelectedDate.format("YYYY-MM-DD"));
    const [allDay, setAllDay] = useState(true);
    const [startTime, setStartTime] = useState(moment().add(1, "hours").format("HH") + ":00");

    const [calendar, setCalendar] = useState(props.user.main_calendar);
    const [color, setColor] = useState('');

    const [calendars, setCalendars] = useState('');
    const [calendarsLoaded, setCalendarsLoaded] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const reminderCreate = (e) => {
        e.preventDefault();

        const all_day = allDay;
        const calendar_id = calendar;

        let start = startDate + " " + startTime + ":00";

        if (all_day === true) {
            start = startDate + " 00:00:00";
        }

        fetch(process.env.REACT_APP_DOMAIN + '/api/reminder/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                name,
                description,
                start,
                all_day,
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
                props.setShowReminderModal(false);
                props.updateEvents();
            })
            .catch(error => {
                alert(error);
                props.setShowReminderModal(false);
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

        let selectAllDay = (
            <Form.Floating controlid="formAllDay" className="mt-3">
                <ButtonGroup aria-label="All Day" className="d-flex">
                    <Button variant="primary" className="w-100 active" onClick={() => setAllDay(true)}>All day</Button>
                    <Button variant="primary" className="w-100" onClick={() => setAllDay(false)}>Selected time</Button>
                </ButtonGroup>
            </Form.Floating>
        );

        if (allDay === false) {
            selectAllDay = (
                <div>
                    <Form.Floating controlid="formAllDay" className="mt-3">
                        <ButtonGroup aria-label="All Day" className="d-flex">
                            <Button variant="primary" className="w-100" onClick={() => setAllDay(true)}>All day</Button>
                            <Button variant="primary" className="w-100 active" onClick={() => setAllDay(false)}>Selected time</Button>
                        </ButtonGroup>
                    </Form.Floating>

                    <Form.Floating controlid="formStartTime" className="mt-3">
                        <Form.Control type="time" className="top" placeholder="Start Time *" onChange={e => setStartTime(e.target.value)} defaultValue={startTime} required />
                        <Form.Label>Time *</Form.Label>
                    </Form.Floating>
                </div>
            );
        }

        return (
            <Modal show={true} onHide={() => props.setShowReminderModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create reminder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={reminderCreate}>
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

                        {selectAllDay}

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

                        <Button variant="primary" type="submit" size="lg" className="w-100 mt-3"><PlusCircleDotted /> Create reminder</Button>
                        <Button variant="outline-secondary" className="w-100 mt-3" onClick={() => props.setShowReminderModal(false)}><ChevronLeft />Go back to Calendar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
};

export default CreateReminder;
