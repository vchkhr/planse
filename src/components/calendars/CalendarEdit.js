import React, { useEffect, useState } from 'react';

import { withRouter } from "react-router";
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
                <p>Loading information about this calendar...</p>
            </div>
        );
    }
    else {
        const calendarInfo = calendars.filter((calendar) => parseInt(calendar.id, 10) === parseInt(props.match.params.id, 10))[0];

        let calendarControl = (
            <div>
                <form>
                    <Link to={{ pathname: "/calendar/updateMain/" + props.match.params.id, state: { mainName: calendarInfo.name } }} className="w-100 btn btn-lg btn-warning">Make the main calendar</Link>
                </form>
                <form>
                    <button className="w-100 btn btn-lg btn-danger mt-3" onClick={() => history.push("/calendar/delete/" + props.match.params.id)}>Delete calendar</button>
                </form>
            </div>
        );
        if (calendarInfo.id === props.user.main_calendar) {
            calendarControl = (
                <div className="mt-3">
                    <p>You can't delete your main calendar.</p>
                </div>
            );
        }

        return (
            <div className="container">
                <div className="form text-center">
                    <form onSubmit={calendarEdit}>
                        <h1 className="h3 mb-3 fw-normal">Edit <code>{calendarInfo.name}</code> calendar</h1>

                        <div className="form-floating">
                            <input type="text" className="form-control" id="name" placeholder="Name" onChange={e => setName(e.target.value)} defaultValue={calendarInfo.name} required />
                            <label htmlFor="name">Name *</label>
                        </div>

                        <div className="form-floating mt-3">
                            <input type="text" className="form-control" id="description" placeholder="Description" onChange={e => setDescription(e.target.value)} defaultValue={calendarInfo.description} />
                            <label htmlFor="description">Description</label>
                        </div>

                        <div className="form-floating mt-3">
                            <select className="form-select" aria-label="Color" id="color" onChange={e => setColor(e.target.value)} defaultValue={calendarInfo.color} >
                                <option value="0">Red</option>
                                <option value="1">Orange</option>
                                <option value="2">Yellow</option>
                                <option value="3">Green</option>
                                <option value="4">Blue</option>
                                <option value="5">Violet</option>
                            </select>
                            <label htmlFor="color">Color</label>
                        </div>

                        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Save changes</button>
                    </form>

                    <hr />
                    {calendarControl}
                </div>
            </div>
        );
    }
};

export default withRouter(CalendarEdit);
