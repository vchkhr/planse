import React, { useState } from 'react';

import { Redirect } from "react-router-dom";

import moment from 'moment';

import { TopNav } from '../calendar/TopNav';
import { CalendarBody } from '../calendar/CalendarBody';
import { Welcome } from '../account/Welcome';
import { Spinner } from 'react-bootstrap';

import CreateEvent from './modal/CreateEvent';
import CreateArrangement from './modal/CreateArrangement';
import CreateReminder from './modal/CreateReminder';
import CreateTask from './modal/CreateTask';

import ArrangementDetails from './modal/ArrangementDetails';
import ReminderDetails from './modal/ReminderDetails';
import TaskDetails from './modal/TaskDetails';


export const Calendar = (props) => {
    const [redirectToLogin] = useState(false);
    const [view, setView] = useState('month');
    const [viewDate, setViewDate] = useState(moment());

    const [calendarSelectedDate, setCalendarSelectedDate] = useState(false);
    
    const [showEventModal, setShowEventModal] = useState(false);
    const [showArrangementModal, setShowArrangementModal] = useState(false);
    const [showReminderModal, setShowReminderModal] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);

    const [showArrangementDetailsModal, setShowArrangementDetailsModal] = useState(false);
    const [showReminderDetailsModal, setShowReminderDetailsModal] = useState(false);
    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);

    let createEvent = (
        <div></div>
    );
    let arrangementDetails = (
        <div></div>
    );
    let reminderDetails = (
        <div></div>
    );
    let taskDetails = (
        <div></div>
    );

    if (showEventModal.target) {
        let event = showEventModal.target.classList.value;
        if (event.indexOf('day-') > 0) {
            createEvent = (
                <CreateEvent setShowEventModal={setShowEventModal} setShowArrangementModal={setShowArrangementModal} setShowReminderModal={setShowReminderModal} setShowTaskModal={setShowTaskModal} event={event} setCalendarSelectedDate={setCalendarSelectedDate} />
            );
        }
        else if (event.indexOf('arrangement-') > 0) {
            let arrangement = event.split('arrangement-')[1].split(' ')[0];

            if (arrangement !== "timeSpecific" && arrangement !== "allDay") {
                arrangementDetails = (
                    <ArrangementDetails user={props.user} setShowEventModal={setShowEventModal} showArrangementDetailsModal={showArrangementDetailsModal} setShowArrangementDetailsModal={setShowArrangementDetailsModal} updateEvents={props.updateEvents} arrangement={arrangement} />
                );
            }
        }
        else if (event.indexOf('reminder-') > 0) {
            let reminder = event.split('reminder-')[1].split(' ')[0];

            if (reminder !== "timeSpecific" && reminder !== "allDay") {
                reminderDetails = (
                    <ReminderDetails user={props.user} setShowEventModal={setShowEventModal} showReminderDetailsModal={showReminderDetailsModal} setShowReminderDetailsModal={setShowReminderDetailsModal} updateEvents={props.updateEvents} reminder={reminder} />
                );
            }
        }
        else if (event.indexOf('task-') > 0) {
            let task = event.split('task-')[1].split(' ')[0];

            if (task !== "timeSpecific" && task !== "allDay") {
                taskDetails = (
                    <TaskDetails user={props.user} setShowEventModal={setShowEventModal} showTaskDetailsModal={showTaskDetailsModal} setShowTaskDetailsModal={setShowTaskDetailsModal} updateEvents={props.updateEvents} task={task} />
                );
            }
        }
    }

    let createArrangement = (
        <div></div>
    );
    if (showArrangementModal === true) {
        createArrangement = (
            <CreateArrangement showArrangementModal={showArrangementModal} setShowArrangementModal={setShowArrangementModal} user={props.user} userLoaded={props.userLoaded} calendarSelectedDate={calendarSelectedDate} updateEvents={props.updateEvents} />
        );
    }

    let createReminder = (
        <div></div>
    );
    if (showReminderModal === true) {
        createReminder = (
            <CreateReminder showReminderModal={showReminderModal} setShowReminderModal={setShowReminderModal} user={props.user} userLoaded={props.userLoaded} calendarSelectedDate={calendarSelectedDate} updateEvents={props.updateEvents} />
        );
    }

    let createTask = (
        <div></div>
    );
    if (showTaskModal === true) {
        createTask = (
            <CreateTask showTaskModal={showTaskModal} setShowTaskModal={setShowTaskModal} user={props.user} userLoaded={props.userLoaded} calendarSelectedDate={calendarSelectedDate} updateEvents={props.updateEvents} />
        );
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
                    {createEvent}
                    {createArrangement}
                    {createReminder}
                    {createTask}

                    {arrangementDetails}
                    {reminderDetails}
                    {taskDetails}

                    <TopNav user={props.user} userLoaded={props.userLoaded} view={view} setView={setView} viewDate={viewDate} setViewDate={setViewDate} />

                    <CalendarBody user={props.user} userLoaded={props.userLoaded} view={view} viewDate={viewDate} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} showEventModal={showEventModal} setShowEventModal={setShowEventModal} events={props.events} eventsLoaded={props.eventsLoaded} showAllDayEvents={props.showAllDayEvents} showTimeSpecificEvents={props.showTimeSpecificEvents} />
                </div>
            );
        }
    }
};

export default Calendar;
