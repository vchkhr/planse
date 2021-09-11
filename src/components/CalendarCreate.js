import React, { useState } from 'react';

import { Redirect } from "react-router-dom";


const CalendarCreate = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');

    const [redirect, setRedirect] = useState(false);
    
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
                setRedirect(true);
            })
            .catch(error => {
            });
    }

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div className="container mainDiv">
            <div className="form-signin text-center">
                <form onSubmit={createCalendar}>
                    <h1 className="h3 mb-3 fw-normal">Create a Calendar</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="name" placeholder="Name" onChange={e => setName(e.target.value)} required />
                        <label htmlFor="name">Name *</label>
                    </div>

                    <div className="form-floating mt-3">
                        <input type="text" className="form-control" id="description" placeholder="Description" onChange={e => setDescription(e.target.value)} />
                        <label htmlFor="description">Description</label>
                    </div>

                    <div className=" mt-3">
                        <select className="form-select" aria-label="Color" id="color" onChange={e => setColor(e.target.value)}>
                            <option value="0">Color</option>
                            <option value="0">Red</option>
                        </select>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Create Calendar</button>
                </form>
            </div>
        </div>
    );
};

export default CalendarCreate;