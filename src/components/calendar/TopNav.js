import React from 'react';

import { Link } from "react-router-dom";

import moment from 'moment';
import { Button, ButtonGroup } from 'react-bootstrap';
import { ChevronCompactRight, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';


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
                <ButtonGroup size="sm" aria-label="View">
                    <Button variant={props.view === 'week' ? 'primary' : 'outline-primary'} onClick={() => props.setView("week")}>Week</Button>
                    <Button variant={props.view === 'month' ? 'primary' : 'outline-primary'} onClick={() => props.setView("month")}>Month</Button>
                    <Button variant={props.view === 'year' ? 'primary' : 'outline-primary'} onClick={() => props.setView("year")}>Year</Button>
                </ButtonGroup>
            </div>
        );

        const username = (
            <div className="account">
                <p className="text-end">
                    <Link to="/logout" className="text-decoration-none">{props.user.name} <ChevronCompactRight /></Link>
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
                                <span className="chevron" onClick={() => props.setViewDate(moment(props.viewDate).subtract(1, "months"))}><ChevronLeft /></span>

                                <span>{moment(props.viewDate).format('MMMM')} </span>
                                <span className="fw-lighter">{moment(props.viewDate).format('YYYY')}</span>

                                <span className="chevron" onClick={() => props.setViewDate(moment(props.viewDate).add(1, "months"))}><ChevronRight /></span>
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
