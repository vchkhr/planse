import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Save } from 'react-bootstrap-icons';

import { withRouter } from 'react-router';
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

import { useHistory } from "react-router-dom";


const CalendarEdit = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState();

    const [calendarEditRedirect, setCalendarEditRedirect] = useState(false);

    const [calendars, setCalendars] = useState('');
    const [calendarsLoaded, setCalendarsLoaded] = useState(false);

    const history = useHistory();

    useEffect(() => {
        fetchData();
    }, []);

    const calendarEdit = (e) => {
        e.preventDefault();

        fetch(process.env.REACT_APP_DOMAIN + '/api/calendar/update/' + props.match.params.id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                name,
                description,
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
                setCalendarEditRedirect(true);
            })
            .catch(error => {
                alert(error);
            });
    }

    if (calendarEditRedirect) {
        return <Redirect to="/" />;
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
        const calendarInfo = calendars.filter((calendar) => parseInt(calendar.id, 10) === parseInt(props.match.params.id, 10))[0];

        let calendarControl = (
            <div className="mt-3">
                <Link to={{ pathname: "/calendar/updateMain/" + props.match.params.id, state: { mainName: calendarInfo.name } }} className="w-100 btn btn-lg btn-warning">Make the main calendar</Link>

                <Button variant="danger" size="lg" className="w-100 mt-3" onClick={() => history.push("/calendar/delete/" + props.match.params.id)}>Delete calendar</Button>
            </div>
        );
        if (calendarInfo.id === props.user.main_calendar) {
            calendarControl = (
                <div className="mt-3">
                    <p className="text-center">You can't delete your main calendar</p>
                </div>
            );
        }

        return (
            <div>
                <Form onSubmit={calendarEdit}>
                    <p className="text-center">
                        <img className="mb-4" src="/logo.png" alt="PLANSE" />
                    </p>

                    <h1 className="h3 mb-3 fw-normal text-center">Edit <code>{calendarInfo.name}</code> calendar</h1>

                    <Form.Floating controlId="formName">
                        <Form.Control type="text" className="top" placeholder="Home" onChange={e => setName(e.target.value)} defaultValue={calendarInfo.name} required />
                        <Form.Label>Name *</Form.Label>
                    </Form.Floating>

                    <Form.Floating controlId="formDescription">
                        <Form.Control type="text" className="middle" placeholder="Calendar for home events" defaultValue={calendarInfo.description} onChange={e => setDescription(e.target.value)} />
                        <Form.Label>Description</Form.Label>
                    </Form.Floating>

                    <Form.Floating controlId="formColor">
                        <Form.Select className="bottom" aria-label="Color *" onChange={e => setColor(e.target.value)} defaultValue={calendarInfo.color} >
                            <option value="0">Red</option>
                            <option value="1">Orange</option>
                            <option value="2">Yellow</option>
                            <option value="3">Green</option>
                            <option value="4">Blue</option>
                            <option value="5">Purple</option>
                        </Form.Select>
                        <Form.Label>Color *</Form.Label>
                    </Form.Floating>

                    <Button variant="primary" size="lg" className="w-100 mt-3" type="submit">Save changes <Save /></Button>
                    
                    <hr className="mt-3" />
                    {calendarControl}
                </Form>
            </div>
        );
    }
};

export default withRouter(CalendarEdit);
