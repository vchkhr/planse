import React from 'react';

import { Link } from 'react-router-dom';


const EventCreate = (props) => {
    return (
        <div className="container mainDiv">
            <div className="form text-center">
                <form>
                    <h1 className="h3 mb-3 fw-normal">Create event</h1>

                    <Link to="/arrangement/create" role="button" className="w-100 btn btn-lg btn-primary mt-3"><i className="bi bi-calendar-event"></i> Arrangement</Link>
                    <button className="w-100 btn btn-lg btn-outline-primary mt-3 disabled"><i className="bi bi-bell"></i> Reminder</button>
                    <button className="w-100 btn btn-lg btn-outline-primary mt-3 disabled"><i className="bi bi-sticky"></i> Task</button>
                </form>
            </div>
        </div>
    );
};

export default EventCreate;
