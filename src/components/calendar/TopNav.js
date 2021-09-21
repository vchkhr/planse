import React from 'react';

import { Link } from "react-router-dom";


export const TopNav = (props) => {
    if (props.userLoaded === false) {
        return (
            <div className="text-center mt-5">
                <p>Loading user information...</p>
            </div>
        );
    }
    else {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return (
            <div className="top-nav">
                <div className="btn-group selectView" role="group" aria-label="Basic outlined example">
                    <button type="button" className={props.view === 'week' ? 'btn btn-primary' : 'btn btn-outline-primary disabled'}>Week</button>
                    <button type="button" className={props.view === 'month' ? 'btn btn-primary' : 'btn btn-outline-primary'}>Month</button>
                    <button type="button" className={props.view === 'year' ? 'btn btn-primary' : 'btn btn-outline-primary disabled'}>Year</button>
                </div>

                <div className="currentDate d-flex">
                    <div className="flex-fill">
                        <h3 className="text-center">
                            <span>{months[props.currentMonth.split('.')[0]]} </span>
                            <span className="text-thin">{props.currentMonth.split('.')[1]}</span>
                        </h3>
                    </div>

                    <div className="account text-right">
                        <p className="text-right">
                            <Link to="/logout" className="link-hidden">{props.user.name}<i className="bi bi-chevron-compact-right"></i></Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default TopNav;
