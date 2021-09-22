import React from 'react';

import moment from 'moment';

import { Day } from '../month/Day';


export const MonthView = (props) => {
    if (props.userLoaded === false) {
        return (
            <div className="text-center mt-5">
                <p>Loading user information...</p>
            </div>
        );
    }
    else {
        const firstDay = moment("01 " + moment(props.viewDate).format('MM') + moment(props.viewDate).format('YYYY'), "DD MM YYYY");
        let firstDayDate = moment(firstDay).format('d') - 1;

        if (firstDayDate === -1) {
            firstDayDate = 6;
        }

        return (
            <div className="month">
                <div className="daysOfWeek d-flex">
                    <div className="day">
                        <p className="color-light-gray">Mon</p>
                    </div>

                    <div className="day">
                        <p className="color-light-gray">Tue</p>
                    </div>

                    <div className="day">
                        <p className="color-light-gray">Wed</p>
                    </div>

                    <div className="day">
                        <p className="color-light-gray">Thu</p>
                    </div>

                    <div className="day">
                        <p className="color-light-gray">Fri</p>
                    </div>

                    <div className="day">
                        <p className="color-light-gray">Sat</p>
                    </div>

                    <div className="day">
                        <p className="color-light-gray">Sun</p>
                    </div>
                </div>

                <div className="week d-flex">
                    <div className="day">
                        <Day week="0" day="0" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="0" day="1" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="0" day="2" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="0" day="3" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="0" day="4" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="0" day="5" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="0" day="6" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>
                </div>

                <div className="week d-flex">
                    <div className="day">
                        <Day week="1" day="0" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="1" day="1" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="1" day="2" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="1" day="3" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="1" day="4" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="1" day="5" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="1" day="6" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>
                </div>

                <div className="week d-flex">
                    <div className="day">
                        <Day week="2" day="0" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="2" day="1" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="2" day="2" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="2" day="3" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="2" day="4" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="2" day="5" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="2" day="6" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>
                </div>

                <div className="week d-flex">
                    <div className="day">
                        <Day week="3" day="0" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="3" day="1" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="3" day="2" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="3" day="3" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="3" day="4" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="3" day="5" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="3" day="6" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>
                </div>

                <div className="week d-flex">
                    <div className="day">
                        <Day week="4" day="0" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="4" day="1" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="4" day="2" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="4" day="3" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="4" day="4" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="4" day="5" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="4" day="6" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>
                </div>

                <div className="week d-flex">
                    <div className="day">
                        <Day week="5" day="0" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="5" day="1" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="5" day="2" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="5" day="3" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="5" day="4" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="5" day="5" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>

                    <div className="day">
                        <Day week="5" day="6" firstDay={firstDay} firstDayDate={firstDayDate} viewDate={props.viewDate} />
                    </div>
                </div>
            </div>
        );
    }
};

export default MonthView;
