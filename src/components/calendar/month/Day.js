import React from 'react';

import moment from 'moment';


export const Day = (props) => {
    if (props.userLoaded === false) {
        return (
            <div className="text-center mt-5">
                <p>Loading user information...</p>
            </div>
        );
    }
    else {
        const week = parseInt(props.week, 10);
        const day = parseInt(props.day, 10);
        const firstDay = props.firstDay;
        const firstDayDate = parseInt(props.firstDayDate, 10);

        let dayDate = moment(firstDay).add(day - firstDayDate + week * 7, "days");

        let cn = "dayNum"
        if (dayDate.format("MM") !== props.viewDate.format("MM")) {
            cn = "dayNum color-light-gray"
        }

        return (
            <p className={cn}>{dayDate.format('D')}</p>
        );
    }
};

export default Day;
