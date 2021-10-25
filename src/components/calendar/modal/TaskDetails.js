import React, { useCallback, useEffect, useState } from 'react';

import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { CheckSquare, Save, Square, Trash, XCircle } from 'react-bootstrap-icons';


export const TaskDetails = (props) => {
    const [eventLoaded, setEventLoaded] = useState(false);

    const [calendars, setCalendars] = useState('');
    const [calendarsLoaded, setCalendarsLoaded] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [startDate, setStartDate] = useState('');
    const [isDone, setIsDone] = useState('');

    const [calendar, setCalendar] = useState('');
    const [color, setColor] = useState('');

    const fetchTask = useCallback(() => {
        setEventLoaded(false);

        fetch(process.env.REACT_APP_DOMAIN + '/api/task/' + props.task, {
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

                setIsDone(response.is_done === 1 ? true : false);

                setStartDate(response.start.split(' ')[0]);

                setCalendar(response.calendar_id);
                setColor(response.color);
            })
            .catch(error => {
                // alert(error);
            });
    }, [props.task]);

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
        props.setShowTaskDetailsModal(true);

        fetchTask();
        fetchCalendars();
    }, [props, fetchTask, fetchCalendars]);

    const taskEdit = (e) => {
        e.preventDefault();

        const is_done = isDone;
        const calendar_id = calendar;

        let start = startDate + " 00:00:00";

        if ((start.match(/:/g)).length === 1) {
            start += ":00"
        }

        if ((start.match(/:/g)).length === 3) {
            start = start.substring(0, start.length - 3);
        }

        fetch(process.env.REACT_APP_DOMAIN + '/api/task/edit/' + props.task, {
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
                hideModal();
                props.updateEvents();
            })
            .catch(error => {
                alert(error);
            });
    }

    const deleteTask = () => {
        fetch(process.env.REACT_APP_DOMAIN + '/api/task/delete/' + props.task, {
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
        props.setShowTaskDetailsModal(false);
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

    if (eventLoaded === true && calendarsLoaded === true) {
        calendarsList = calendars.map((calendar) => {
            return (
                <option value={calendar.id} key={calendar.id}>{calendar.name} {calendar.id === props.user.main_calendar ? '(Main)' : ''}</option>
            );
        })

        title = (
            <p><Square /> {name}</p>
        );
        let doneButton = (
            <Button variant="success" onClick={() => setIsDone(!isDone)} type="submit"><CheckSquare /> Done</Button>
        );

        if (isDone === true) {
            title = (
                <p><CheckSquare /> <del>{name}</del></p>
            );

            doneButton = (
                <Button variant="warning" onClick={() => setIsDone(!isDone)} type="submit"><Square /> Undone</Button>
            );
        }

        content = (
            <div>
                <Form onSubmit={taskEdit}>
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
                        <Button variant="outline-danger" onClick={() => deleteTask()}><Trash /> Delete</Button>

                        <div className="btn-group">
                            <Button variant="outline-secondary" onClick={() => hideModal()}><XCircle /> Close</Button>
                            <Button variant="outline-primary" type="submit"><Save /> Save</Button>

                            {doneButton}
                        </div>
                    </div>
                </Form>
            </div>
        );
    }

    return (
        <Modal show={props.showTaskDetailsModal} onHide={() => hideModal()}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {content}
            </Modal.Body>
        </Modal>
    );
}

export default TaskDetails;
