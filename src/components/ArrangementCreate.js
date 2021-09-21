import React, { useEffect, useState } from 'react';

import { Redirect } from "react-router-dom";


const ArrangementCreate = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [allDay, setAllDay] = useState(true);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [calendar, setCalendar] = useState(props.user.main_calendar);
    const [color, setColor] = useState('');

    const [arrangementCreateRedirect, setArrangementCreateRedirect] = useState(false);

    const [calendars, setCalendars] = useState('');
    const [calendarsLoaded, setCalendarsLoaded] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const arrangementCreate = (e) => {
        e.preventDefault();

        const all_day = allDay;
        const calendar_id = calendar;

        let start = startDate + " " + startTime + ":00";
        let end = endDate + " " + endTime + ":00";

        if (all_day === true) {
            start = startDate + " 00:00:00";
            end = endDate + " 00:00:00";
        }

        fetch(process.env.REACT_APP_DOMAIN + '/api/arrangement/create', {
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
                setArrangementCreateRedirect(true);
            })
            .catch(error => {
                alert(error);
            });
    }

    if (arrangementCreateRedirect) {
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
            <div className="container mainDiv">
                <p className="t-center">Loading information about your calendars...</p>
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
            <div className="form-floating mt-3">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary active" onClick={() => setAllDay(true)}>All day</button>
                    <button type="button" className="btn btn-primary" onClick={() => setAllDay(false)}>Selected time</button>
                </div>
            </div>
        );
        if (allDay === false) {
            selectAllDay = (
                <div>
                    <div className="form-floating mt-3">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary" onClick={() => setAllDay(true)}>All day</button>
                            <button type="button" className="btn btn-primary active" onClick={() => setAllDay(false)}>Selected time</button>
                        </div>
                    </div>

                    <div className="form-floating mt-3">
                            <input type="time" className="form-control" id="start-time" placeholder="Start Time* " onChange={e => setStartTime(e.target.value)} required />
                            <label htmlFor="start-time">Start Time *</label>
                        </div>

                        <div className="form-floating mt-3">
                            <input type="time" className="form-control" id="end-time" placeholder="End Time *" onChange={e => setEndTime(e.target.value)} required />
                            <label htmlFor="end-time">End Time *</label>
                        </div>
                </div>
            );
        }

        return (
            <div className="container mainDiv">
                <div className="form text-center">
                    <form onSubmit={arrangementCreate}>
                        <h1 className="h3 mb-3 fw-normal">Create arrangement</h1>

                        <div className="form-floating">
                            <input type="text" className="form-control" id="name" placeholder="Name" onChange={e => setName(e.target.value)} required />
                            <label htmlFor="name">Name *</label>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>

                        <div className="form-floating mt-3">
                            <input type="text" className="form-control" id="description" placeholder="Description" onChange={e => setDescription(e.target.value)} />
                            <label htmlFor="description">Description</label>
                        </div>

                        <hr className="mt-5 mb-5" />

                        <div className="form-floating mt-3">
                            <input type="date" className="form-control" id="start-date" placeholder="Start Date* " onChange={e => setStartDate(e.target.value)} required />
                            <label htmlFor="start-date">Start Date *</label>
                        </div>

                        <div className="form-floating mt-3">
                            <input type="date" className="form-control" id="end-date" placeholder="End Date *" onChange={e => setEndDate(e.target.value)} required />
                            <label htmlFor="end-date">End Date *</label>
                        </div>

                        {selectAllDay}

                        <hr className="mt-5 mb-5" />

                        <div className="form-floating mt-3">
                            <select className="form-select" aria-label="Calendar" id="calendar" onChange={e => setCalendar(e.target.value)} defaultValue={props.user.main_calendar}>
                                {calendarsList}
                            </select>
                            <label htmlFor="calendar">Calendar</label>
                        </div>

                        <div className="form-floating mt-3">
                            <select className="form-select" aria-label="Color" id="color" onChange={e => setColor(e.target.value)} defaultValue="">
                                <option value="">Color of calendar</option>
                                <option value="0">Red</option>
                                <option value="1">Orange</option>
                                <option value="2">Yellow</option>
                                <option value="3">Green</option>
                                <option value="4">Blue</option>
                                <option value="5">Violet</option>
                            </select>
                            <label htmlFor="color">Color</label>
                        </div>

                        <button className="w-100 btn btn-lg btn-primary mt-3 mb-5" type="submit">Create arrangement</button>
                    </form>
                </div>
            </div>
        );
    }
};

export default ArrangementCreate;
