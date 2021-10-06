import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';

import { Button, ButtonGroup, Form, Modal, Spinner } from 'react-bootstrap';


export const ArrangementDetails = (props) => {
    const [eventLoaded, setEventLoaded] = useState(false);

    const [calendars, setCalendars] = useState('');
    const [calendarsLoaded, setCalendarsLoaded] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [allDay, setAllDay] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [calendar, setCalendar] = useState('');
    const [color, setColor] = useState('');

    const fetchArrangement = useCallback(() => {
        setEventLoaded(false);

        fetch(process.env.REACT_APP_DOMAIN + '/api/arrangement/' + props.arrangement, {
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

                setEndDate(response.end.split(' ')[0]);
                setEndTime(response.end.split(' ')[1]);

                setCalendar(response.calendar_id);
                setColor(response.color);
            })
            .catch(error => {
                // alert(error);
            });
    }, [props.arrangement]);

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
        props.setShowArrangementDetailsModal(true);

        fetchArrangement();
        fetchCalendars();
    }, [props, fetchArrangement, fetchCalendars]);

    const arrangementEdit = (e) => {
        e.preventDefault();

        const all_day = allDay;
        const calendar_id = calendar;

        let start = startDate + " " + startTime + ":00";
        let end = endDate + " " + endTime + ":00";

        if (all_day === true) {
            start = startDate + " 00:00:00";
            end = endDate + " 00:00:00";

            if (moment(endDate).isBefore(moment(startDate))) {
                alert("Start date should be before end date.");
                return;
            }
        }
        else {
            if (moment(endDate + " " + endTime).isBefore(moment(startDate + " " + startTime))) {
                alert("Start date should be before end date.");
                return;
            }
        }

        fetch(process.env.REACT_APP_DOMAIN + '/api/arrangement/update/' + props.arrangement, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                name,
                description,
                start,
                end,
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

    const deleteArrangement = () => {
        fetch(process.env.REACT_APP_DOMAIN + '/api/arrangement/delete/' + props.arrangement, {
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
        props.setShowArrangementDetailsModal(false);
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
                    <Form.Label>Start Time *</Form.Label>
                </Form.Floating>

                <Form.Floating controlid="formEndTime">
                    <Form.Control type="time" className="bottom" placeholder="End Time *" onChange={e => setEndTime(e.target.value)} defaultValue={endTime} required />
                    <Form.Label>End Time *</Form.Label>
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
                <Form onSubmit={arrangementEdit}>
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
                        <Form.Label>Start Date *</Form.Label>
                    </Form.Floating>

                    <Form.Floating controlid="formEndDate">
                        <Form.Control type="date" className="bottom" placeholder="End Date *" onChange={e => setEndDate(e.target.value)} defaultValue={endDate} required />
                        <Form.Label>End Date *</Form.Label>
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
                            <option value="">Color of calendar</option>
                            <option value="0">&#x1F33A; Red</option>
                            <option value="1">&#x1F3C0; Orange</option>
                            <option value="2">&#x2600;&#xFE0F; Yellow</option>
                            <option value="3">&#x1F966; Green</option>
                            <option value="4">&#x1F40B; Blue</option>
                            <option value="5">&#x1F47E; Purple</option>
                        </Form.Select>
                        <Form.Label>Color *</Form.Label>
                    </Form.Floating>

                    <div className="d-flex justify-content-between mt-3">
                        <Button variant="outline-danger" onClick={() => deleteArrangement()}>Delete</Button>

                        <div className="btn-group">
                            <Button variant="outline-secondary" onClick={() => hideModal()}>Cancel</Button>
                            <Button variant="success" type="submit">Save</Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }

    return (
        <Modal show={props.showArrangementDetailsModal} onHide={() => hideModal()}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {content}
            </Modal.Body>
        </Modal>
    );
}

export default ArrangementDetails;
