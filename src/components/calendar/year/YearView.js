import React from 'react';

import moment from 'moment';

import { YearRow } from '../year/YearRow';
import { Spinner } from 'react-bootstrap';


export const YearView = (props) => {
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
        // const firstDay = moment("01 01 " + moment(props.viewDate).format('YYYY'), "DD MM YYYY");

        let months = []
        for (let i = 0; i < 3; i++) {
            let arr = [];

            for (let j = 0; j < 4; j++) {
                arr.push(j.toString());
            }

            months.push(arr);
        }

        let monthsJS = months.map((row, index) => {
            return (
                <div className="yearRow d-flex">
                    <YearRow className="yearRow d-flex" row={row} index={index} key={index} viewDate={props.viewDate} />
                    {/* <YearRow className="yearRow d-flex" row={row} index={index} key={index} firstDay={firstDay} viewDate={props.viewDate} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} eventsLoaded={props.eventsLoaded} events={props.events} showEventModal={props.showEventModal} setShowEventModal={props.setShowEventModal} showAllDayEvents={props.showAllDayEvents} showTimeSpecificEvents={props.showTimeSpecificEvents} showArrangements={props.showArrangements} showReminders={props.showReminders} showTasks={props.showTasks}/> */}
                </div>
            );
        });

        return (
            <div className="viewYear">
                {monthsJS}
            </div>
        );
    }
};

export default YearView;
