import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { CalendarPlus } from 'react-bootstrap-icons';

import { Redirect } from "react-router-dom";


const CalendarCreate = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState(0);

    const [createCalendarCreateRedirect, setCalendarCreateRedirect] = useState(false);

    const createCalendar = (e) => {
        e.preventDefault();

        fetch(process.env.REACT_APP_DOMAIN + '/api/calendar/create', {
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
                setCalendarCreateRedirect(true);
            })
            .catch(error => {
                alert(error);
            });
    }

    if (createCalendarCreateRedirect) {
        return <Redirect to="/" />;
    }

    return (
        <Form className="formCard" onSubmit={createCalendar}>
            <p className="text-center">
                <img className="mb-4" src="/logo.png" alt="PLANSE" />
            </p>

            <h1 className="h3 mb-3 fw-normal text-center">Create calendar</h1>

            <Form.Floating controlId="formName" className="mt-3">
                <Form.Control type="text" className="top" placeholder="Home" onChange={e => setName(e.target.value)} required />
                <Form.Label>Name *</Form.Label>
            </Form.Floating>

            <Form.Floating controlId="formDescription">
                <Form.Control type="text" className="middle" placeholder="Calendar for home events" onChange={e => setDescription(e.target.value)} />
                <Form.Label>Description</Form.Label>
            </Form.Floating>

            <Form.Floating controlId="formColor">
                <Form.Select className="bottom" aria-label="Color *" onChange={e => setColor(e.target.value)} defaultValue="0" >
                    <option value="0">&#x1F33A; Red</option>
                    <option value="1">&#x1F3C0; Orange</option>
                    <option value="2">&#x2600;&#xFE0F; Yellow</option>
                    <option value="3">&#x1F966; Green</option>
                    <option value="4">&#x1F40B; Blue</option>
                    <option value="5">&#x1F47E; Purple</option>
                </Form.Select>
                <Form.Label>Color *</Form.Label>
            </Form.Floating>

            <Button variant="primary" type="submit" size="lg" className="w-100 mt-3">Create calendar <CalendarPlus /></Button>
        </Form>
    );
};

export default CalendarCreate;
