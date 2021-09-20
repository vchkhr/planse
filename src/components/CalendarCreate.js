import React, { useState } from 'react';

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
        <div className="container mainDiv">
            <div className="form-signin text-center">
                <form onSubmit={createCalendar}>
                    <h1 className="h3 mb-3 fw-normal">Create calendar</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="name" placeholder="Name" onChange={e => setName(e.target.value)} required />
                        <label htmlFor="name">Name *</label>
                    </div>

                    <div className="form-floating mt-3">
                        <input type="text" className="form-control" id="description" placeholder="Description" onChange={e => setDescription(e.target.value)} />
                        <label htmlFor="description">Description</label>
                    </div>

                    <div className="form-floating mt-3">
                        <select className="form-select" aria-label="Color" id="color" onChange={e => setColor(e.target.value)} defaultValue="0">
                            <option value="0">Red</option>
                            <option value="1">Orange</option>
                            <option value="2">Yellow</option>
                            <option value="3">Green</option>
                            <option value="4">Blue</option>
                            <option value="5">Violet</option>
                        </select>
                        <label htmlFor="color">Color</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Create calendar</button>
                </form>
            </div>
        </div>
    );
};

export default CalendarCreate;
