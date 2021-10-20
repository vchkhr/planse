import React from 'react';

import moment from 'moment';

import { Week } from '../month/Week';
import { Spinner } from 'react-bootstrap';


export const MonthView = (props) => {
    if (props.userLoaded === false || props.userLoaded === false || props.calendarsLoaded === false || props.eventsLoaded === false) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="grow" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }
    else {
        const firstDay = moment("01 " + moment(props.viewDate).format('MM') + moment(props.viewDate).format('YYYY'), "DD MM YYYY");
        let firstDayDate = moment(firstDay).format('d') - 1;

        if (firstDayDate === -1) {
            firstDayDate = 6;
        }

        let weeks = [
            ['0', '1', '2', '3', '4', '5', '6'],
            ['0', '1', '2', '3', '4', '5', '6'],
            ['0', '1', '2', '3', '4', '5', '6'],
            ['0', '1', '2', '3', '4', '5', '6'],
            ['0', '1', '2', '3', '4', '5', '6'],
            ['0', '1', '2', '3', '4', '5', '6']
        ];

        let weeksJS = weeks.map((week, index) => {
            return (
                <div className="week d-flex" key={index} style={{zIndex: index}}>
                    <Week className="week d-flex" week={week} index={index} key={index} firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} eventsLoaded={props.eventsLoaded} events={props.events} showEventModal={props.showEventModal} setShowEventModal={props.setShowEventModal} showAllDayEvents={props.showAllDayEvents} showTimeSpecificEvents={props.showTimeSpecificEvents} showArrangements={props.showArrangements} showReminders={props.showReminders} showTasks={props.showTasks} />
                </div>
            );
        });

        return (
            <div className="month">
                <div className="daysOfWeek d-flex">
                    <div className="day">
                        <p>Mon</p>
                    </div>

                    <div className="day">
                        <p>Tue</p>
                    </div>

                    <div className="day">
                        <p>Wed</p>
                    </div>

                    <div className="day">
                        <p>Thu</p>
                    </div>

                    <div className="day">
                        <p>Fri</p>
                    </div>

                    <div className="day">
                        <p>Sat</p>
                    </div>

                    <div className="day">
                        <p>Sun</p>
                    </div>
                </div>

                {weeksJS}
            </div>
        );
    }
};

export default MonthView;
