import React from 'react';

import { Link } from "react-router-dom";

import moment from 'moment';


export const TopNav = (props) => {
    if (props.userLoaded === false) {
        return (
            <div className="text-center mt-5">
                <p>Loading user information...</p>
            </div>
        );
    }
    else {
        const viewButtons = (
            <div className="selectView d-flex">
                <div className="btn-group btn-group-sm flex-fill" role="group" aria-label="Basic outlined example">
                    <button type="button" className={props.view === 'week' ? 'btn btn-primary' : 'btn btn-outline-primary'} onClick={() => props.setView('week')}>Week</button>
                    <button type="button" className={props.view === 'month' ? 'btn btn-primary' : 'btn btn-outline-primary'} onClick={() => props.setView('month')}>Month</button>
                    <button type="button" className={props.view === 'year' ? 'btn btn-primary' : 'btn btn-outline-primary'} onClick={() => props.setView('year')}>Year</button>
                </div>
            </div>
        );

        const username = (
            <div className="account text-right">
                <p className="text-right">
                    <Link to="/logout" className="link-hidden">{props.user.name} <i className="bi bi-chevron-compact-right"></i></Link>
                </p>
            </div>
        );

        if (props.view === "week") {
            return (
                <div className="top-nav">
                    {viewButtons}

                    <div className="currentDate d-flex">
                        

                        {username}
                    </div>
                </div>
            );
        }
        else if (props.view === "month") {
            return (
                <div className="top-nav">
                    {viewButtons}

                    <div className="currentDate d-flex">
                        <div className="flex-fill">
                            <h3 className="text-center">
                                <span className="chevron" onClick={() => props.setViewDate(moment(props.viewDate).subtract(1, "months"))}><i className="bi bi-chevron-left"></i></span>

                                <span>{moment(props.viewDate).format('MMMM')} </span>
                                <span className="text-thin">{moment(props.viewDate).format('YYYY')}</span>

                                <span className="chevron" onClick={() => props.setViewDate(moment(props.viewDate).add(1, "months"))}><i className="bi bi-chevron-right"></i></span>
                            </h3>
                        </div>

                        {username}
                    </div>
                </div>
            );
        }
        else if (props.view === "year") {
            return (
                <div className="top-nav">
                    {viewButtons}

                    <div className="currentDate d-flex">
                        

                        {username}
                    </div>
                </div>
            );
        }
    }
};

export default TopNav;
