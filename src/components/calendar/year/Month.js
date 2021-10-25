import React from 'react';

import moment from 'moment';

import { Spinner } from 'react-bootstrap';


export const Month = (props) => {
    if (props.userLoaded === false || props.calendarsLoaded === false || props.eventsLoaded === false) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="grow" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }
    else {
        let date = moment(props.index * 4 + parseInt(props.month, 10) + 1 + " " + moment(props.viewDate).format("YYYY"), "MM YYYY");
        let lastDay = moment(date).endOf('month').format("D");

        let weeks = []
        for (let i = 0; i <= 5; i++) {
            let arr = [];

            for (let j = 0; j <= 6; j++) {
                arr.push(j.toString());
            }

            weeks.push(arr);
        }

        let weeksJS = weeks.map((week, index) => {
            let w = week.map((day, i) => {
                let dayDate = index * 7 + parseInt(day, 10) + 1 - parseInt(date.format("d"), 10) + 1;

                return (
                    <p key={index + "-" + i} className={"day text-center fw-light " + (parseInt(day, 10) >= 5 ? "text-muted" : "")}>{ (dayDate > 0 && dayDate <= lastDay) ? dayDate : ''}</p>
                );
            });

            return (
                <div className="week d-flex">
                    {w}
                </div>
            );
        });

        let clickMonth = () => {
            props.setView("month");
            props.setViewDate(date);
        }

        return (
            <div style={{zIndex: props.index + 1}}>
                <p className="text-center pb-2 name" onClick={()=> {clickMonth()}}>{date.format("MMMM")}</p>
                {weeksJS}
            </div>
        );
    }
};

export default Month;
