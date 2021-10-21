import React from 'react';

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
                    <YearRow className="yearRow d-flex" row={row} index={index} key={index} view={props.view} setView={props.setView} viewDate={props.viewDate} setViewDate={props.setViewDate} />
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
