import React, { useState } from 'react';

import { Redirect } from "react-router-dom";

import moment from 'moment';

import { TopNav } from '../calendar/TopNav';
import { CalendarBody } from '../calendar/CalendarBody';
import { Welcome } from '../account/Welcome';
import { Modal, Spinner } from 'react-bootstrap';


export const Calendar = (props) => {
    const [redirectToLogin] = useState(false);
    const [view, setView] = useState('month');
    const [viewDate, setViewDate] = useState(moment());
    const [showEventModal, setShowEventModal] = useState(false);

    let modalContent = (
        <div></div>
    );

    if (showEventModal.target) {
        let event = showEventModal.target.classList.value;
        if (event.indexOf('day-') > 0) {
            let day = event.split('day-')[1].split(' ')[0];

            modalContent = (
                <Modal show={true} onHide={() => setShowEventModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body></Modal.Body>
                </Modal>
            );
        }
        else if (event.indexOf('arrangement-') > 0) {
            let arrangement = event.split('arrangement-')[1].split(' ')[0];
        }
    }

    if (redirectToLogin) {
        return <Redirect to="/login" />;
    }

    if (props.userLoaded === false) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="grow" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }
    else {

        if (props.user.length === 0) {
            return (
                <Welcome />
            );
        }
        else {
            return (
                <div className="calendar">
                    {modalContent}

                    <TopNav user={props.user} userLoaded={props.userLoaded} view={view} setView={setView} viewDate={viewDate} setViewDate={setViewDate} />

                    <CalendarBody user={props.user} userLoaded={props.userLoaded} view={view} viewDate={viewDate} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} showEventModal={showEventModal} setShowEventModal={setShowEventModal} />
                </div>
            );
        }
    }
};

export default Calendar;
