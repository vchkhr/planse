import React from 'react';

import { Link } from "react-router-dom";

import moment from 'moment';
import { Button, ButtonGroup, Spinner } from 'react-bootstrap';
import { ChevronCompactRight, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';


export const TopNav = (props) => {
    if (props.userLoaded === false) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="grow" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }
    else {
        let todayButton = (<div></div>);
        let currentDateClassName = "currentDate d-flex";
        if (moment(props.viewDate).format('MM YYYY') !== moment().format('MM YYYY')) {
            todayButton = (
                <ButtonGroup size="sm" aria-label="View" className="goToToday">
                    <Button variant="outline-primary" onClick={() => props.setViewDate(moment())}>Go to Today</Button>
                </ButtonGroup>
            );

            currentDateClassName += " notToday";
        }

        const viewButtons = (
            <div className="selectView d-flex">
                <ButtonGroup size="sm" aria-label="View" className="viewButtons">
                    <Button variant={props.view === 'week' ? 'primary' : 'outline-primary'} onClick={() => props.setView("week")}>Week</Button>
                    <Button variant={props.view === 'month' ? 'primary' : 'outline-primary'} onClick={() => props.setView("month")}>Month</Button>
                    <Button variant={props.view === 'year' ? 'primary' : 'outline-primary'} onClick={() => props.setView("year")}>Year</Button>
                </ButtonGroup>

                {todayButton}
            </div>
        );

        const username = (
            <div className="account">
                <p className="text-end">
                    <Link to="/logout" className="text-decoration-none">{props.user.name} <ChevronCompactRight /></Link>
                </p>
            </div>
        );

        let viewAdjust = "weeks";
        let displayDate = "MMMM";
        let displayDateLight = "YYYY";

        if (props.view === "month") {
            viewAdjust = "months";
            displayDate = "MMMM";
            displayDateLight = "YYYY";
        }
        else if (props.view === "year") {
            viewAdjust = "years";
            displayDate = "YYYY";
            displayDateLight = false;
        }

        return (
            <div className="top-nav">
                {viewButtons}

                <div className={currentDateClassName}>
                    <div className="flex-fill">
                        <h3 className="text-center">
                            <span className="chevron" onClick={() => props.setViewDate(moment(props.viewDate).subtract(1, viewAdjust))}><ChevronLeft /></span>

                            <span>{moment(props.viewDate).format(displayDate)} </span>
                            {displayDateLight === false ? "" : <span className="fw-lighter">{moment(props.viewDate).format(displayDateLight)}</span>}

                            <span className="chevron" onClick={() => props.setViewDate(moment(props.viewDate).add(1, viewAdjust))}><ChevronRight /></span>
                        </h3>
                    </div>

                    {username}
                </div>
            </div>
        );
    }
};

export default TopNav;
