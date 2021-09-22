import React from 'react';

import { MonthView } from '../calendar/month/MonthView';


export const CalendarBody = (props) => {
    if (props.userLoaded === false) {
        return (
            <div className="text-center mt-5">
                <p>Loading user information...</p>
            </div>
        );
    }
    else {
        if (props.view === 'week') {
            return (
                <div>
                    <p>
                        <code>
                            Week view<br />
                            View Date: {props.viewDate}
                        </code>
                    </p>
                </div>
            );
        }
        else if (props.view === 'month') {
            return (
                <MonthView viewDate={props.viewDate} />
            );
        }
        else if (props.view === 'year') {
            return (
                <div>
                    <p>
                        <code>
                            Year view<br />
                            View Date: {props.viewDate}
                        </code>
                    </p>
                </div>
            );
        }
    }
};

export default CalendarBody;
