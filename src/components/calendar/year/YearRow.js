import React from 'react';

import { Spinner } from 'react-bootstrap';
import { Month } from '../year/Month';


export const YearRow = (props) => {
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
        return (
            <>
                {props.row.map((month) => {
                    return (
                        <div className="month">
                            <Month className="month" index={props.index} month={month} viewDate={props.viewDate} view={props.view} setView={props.setView} viewDate={props.viewDate} setViewDate={props.setViewDate} />
                        </div>
                    )
                })}
            </>
        );
    }
};

export default YearRow;
