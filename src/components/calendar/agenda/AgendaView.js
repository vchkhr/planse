import React from 'react';

import moment from 'moment';

import { Spinner } from 'react-bootstrap';
import AgendaStack from './AgendaStack';


export const AgendaView = (props) => {
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
        let date = props.viewDate;
        let firstDay = parseInt(moment(date).startOf('month').format("d"), 10);
        let lastDay = parseInt(moment(date).endOf('month').format("D"), 10);

        let month = []
        for (let i = 0; i < 6; i++) {
            let week = []
            for (let i = 0; i < 7; i++) {
                week.push(i)
            }
            month.push(week)
        }

        let miniCalendar = (
            <div className="miniCalendar">
                <p className="text-center pb-2 name" onClick={() => { goToMonth() }}>{moment(date).format("MMMM")}</p>

                {month.map((week, index) => {
                    return (
                        <div className="d-flex week">
                            {week.map((day) => {
                                let dayDate = index * 7 + day - firstDay + 1;
                                if (dayDate >= 0) {
                                    dayDate += 1;
                                }

                                return (
                                    <p className={"day text-center fw-light " + (parseInt(day, 10) >= 5 ? "text-muted " : "") + ((dayDate > 0 && dayDate <= lastDay) ? "realDate " : "")} onClick={() => { goToDay(dayDate) }}>{(dayDate > 0 && dayDate <= lastDay) ? dayDate : ''}</p>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );

        let goToMonth = () => {
            props.setView("month");
        }

        let goToDay = (d) => {
            if (d > 0 && d <= lastDay) {
                props.setViewDate(moment(d + " " + moment(date).format("MM YYYY"), "D MM YYYY"));
            }
        }

        return (
            <div className="d-flex viewAgenda">
                <div className="left">
                    <div className="date">
                        <p className="lead day">{moment(date).format("D")}</p>
                        <p className="lead date">{moment(date).format("dddd, MMMM DD, YYYY")}</p>
                    </div>

                    {miniCalendar}
                </div>

                <div className="right">
                    <AgendaStack events={props.events} eventsLoaded={props.eventsLoaded} calendars={props.calendars} calendarsLoaded={props.calendarsLoaded} showEventModal={props.showEventModal} setShowEventModal={props.setShowEventModal} showAllDayEvents={props.showAllDayEvents} showTimeSpecificEvents={props.showTimeSpecificEvents} showArrangements={props.showArrangements} showReminders={props.showReminders} showTasks={props.showTasks} viewDate={date} />
                </div>
            </div>
        );
    }
};

export default AgendaView;
