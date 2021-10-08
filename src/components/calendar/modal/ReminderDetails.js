import React, { useCallback, useEffect, useState } from 'react';

import { Button, ButtonGroup, Form, Modal, Spinner } from 'react-bootstrap';
import { Save, Trash, XCircle } from 'react-bootstrap-icons';


export const ReminderDetails = (props) => {
    const [eventLoaded, setEventLoaded] = useState(false);

    const [calendars, setCalendars] = useState('');
    const [calendarsLoaded, setCalendarsLoaded] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [startDate, setStartDate] = useState('');
    const [allDay, setAllDay] = useState('');
    const [startTime, setStartTime] = useState('');

    const [calendar, setCalendar] = useState('');
    const [color, setColor] = useState('');

    const fetchReminder = useCallback(() => {
        setEventLoaded(false);

        fetch(process.env.REACT_APP_DOMAIN + '/api/reminder/' + props.reminder, {
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
                setEventLoaded(true);

                setName(response.name);
                setDescription(response.description);

                setAllDay(response.all_day === 1 ? true : false);

                setStartDate(response.start.split(' ')[0]);
                setStartTime(response.start.split(' ')[1]);

                setCalendar(response.calendar_id);
                setColor(response.color);
            })
            .catch(error => {
                // alert(error);
            });
    }, [props.reminder]);

    const fetchCalendars = useCallback(() => {
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
                // alert(error);
            });
    }, []);

    useEffect(() => {
        props.setShowReminderDetailsModal(true);

        fetchReminder();
        fetchCalendars();
    }, [props, fetchReminder, fetchCalendars]);

    const reminderEdit = (e) => {
        e.preventDefault();

        const all_day = allDay;
        const calendar_id = calendar;

        let start = startDate + " " + startTime + ":00";

        if (all_day === true) {
            start = startDate + " 00:00:00";
        }

        fetch(process.env.REACT_APP_DOMAIN + '/api/reminder/edit/' + props.reminder, {
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
                hideModal();
                props.updateEvents();
            })
            .catch(error => {
                alert(error);
            });
    }

    const deleteReminder = () => {
        fetch(process.env.REACT_APP_DOMAIN + '/api/reminder/delete/' + props.reminder, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({

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
                hideModal();
                props.updateEvents();
            })
            .catch(error => {
                alert(error);
            });
    }

    let hideModal = () => {
        props.setShowReminderDetailsModal(false);
        props.setShowEventModal(false);
    }

    let title = (
        <p>Loading...</p>
    );

    let content = (
        <div className="text-center mt-5 mb-5">
            <Spinner animation="grow" variant="primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );

    let calendarsList = (
        <span></span>
    );

    let selectAllDay = (
        <Form.Floating controlid="formAllDay" className="mt-3">
            <ButtonGroup aria-label="All Day" className="d-flex">
                <Button variant="primary" className={allDay === true ? 'w-100 active' : 'w-100'} onClick={() => setAllDay(true)}>All day</Button>
                <Button variant="primary" className={allDay === false ? 'w-100 active' : 'w-100'} onClick={() => setAllDay(false)}>Selected time</Button>
            </ButtonGroup>
        </Form.Floating>
    );

    if (allDay === false) {
        selectAllDay = (
            <div>
                <Form.Floating controlid="formAllDay" className="mt-3">
                    <ButtonGroup aria-label="All Day" className="d-flex">
                        <Button variant="primary" className={allDay === true ? 'w-100 active' : 'w-100'} onClick={() => setAllDay(true)}>All day</Button>
                        <Button variant="primary" className={allDay === false ? 'w-100 active' : 'w-100'} onClick={() => setAllDay(false)}>Selected time</Button>
                    </ButtonGroup>
                </Form.Floating>

                <Form.Floating controlid="formStartTime" className="mt-3">
                    <Form.Control type="time" className="top" placeholder="Start Time *" onChange={e => setStartTime(e.target.value)} defaultValue={startTime} required />
                    <Form.Label>Time *</Form.Label>
                </Form.Floating>
            </div>
        );
    }

    if (eventLoaded === true && calendarsLoaded === true) {
        calendarsList = calendars.map((calendar) => {
            return (
                <option value={calendar.id} key={calendar.id}>{calendar.name} {calendar.id === props.user.main_calendar ? '(Main)' : ''}</option>
            );
        })

        title = (
            <p>{name}</p>
        );

        content = (
            <div>
                <Form onSubmit={reminderEdit}>
                    <Form.Floating controlid="formName">
                        <Form.Control type="text" className="top" placeholder="Name" onChange={e => setName(e.target.value)} defaultValue={name} required />
                        <Form.Label>Name *</Form.Label>
                    </Form.Floating>

                    <Form.Floating controlid="formDescription">
                        <Form.Control type="text" className="bottom" placeholder="Description" onChange={e => setDescription(e.target.value)} defaultValue={description} />
                        <Form.Label>Description</Form.Label>
                    </Form.Floating>

                    <Form.Floating controlid="formStartDate" className="mt-3">
                        <Form.Control type="date" className="top" placeholder="Start Date *" onChange={e => setStartDate(e.target.value)} defaultValue={startDate} required />
                        <Form.Label>Date *</Form.Label>
                    </Form.Floating>

                    {selectAllDay}

                    <Form.Floating controlid="formCalendar" className="mt-3">
                        <Form.Select className="top" aria-label="Calendar *" onChange={e => setCalendar(e.target.value)} defaultValue={calendar} >
                            {calendarsList}
                        </Form.Select>
                        <Form.Label>Calendar *</Form.Label>
                    </Form.Floating>

                    <Form.Floating controlid="formColor">
                        <Form.Select className="bottom" aria-label="Color *" onChange={e => setColor(e.target.value)} defaultValue={color} >
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

                    <div className="d-flex justify-content-between mt-3">
                        <Button variant="outline-danger" onClick={() => deleteReminder()}><Trash /> Delete</Button>

                        <div className="btn-group">
                            <Button variant="outline-secondary" onClick={() => hideModal()}><XCircle /> Close</Button>
                            <Button variant="primary" type="submit"><Save /> Save</Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }

    return (
        <Modal show={props.showReminderDetailsModal} onHide={() => hideModal()}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {content}
            </Modal.Body>
        </Modal>
    );
}

export default ReminderDetails;
