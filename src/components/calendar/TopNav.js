import React from 'react';

import { Link } from "react-router-dom";

import moment from 'moment';
import { Button, ButtonGroup, Spinner } from 'react-bootstrap';
import { ChevronCompactRight, ChevronLeft, ChevronRight, Dot } from 'react-bootstrap-icons';
import { useMediaQuery } from 'react-responsive';


export const TopNav = (props) => {
    const isMobile = useMediaQuery({ query: `(max-width: 1350px)` });

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
        let currentDateClassName = "currentDate col ";
        if (moment(props.viewDate).format('MM YYYY') !== moment().format('MM YYYY')) {
            todayButton = (
                <ButtonGroup size="sm" aria-label="View" className="goToToday">
                    <Button variant="outline-primary" onClick={() => props.setViewDate(moment())}> {isMobile ? 'TOD' : 'Go to Today'} </Button>
                </ButtonGroup>
            );

            currentDateClassName += " notToday";
        }

        const viewButtons = (
            <div className="selectView">
                <ButtonGroup size="sm" aria-label="View" className="viewButtons">
                    <Button variant={props.view === 'agenda' ? 'primary' : 'outline-primary'} onClick={() => props.setView("agenda")} disabled> {isMobile ? 'A' : 'Agenda'} </Button>
                    <Button variant={props.view === 'month' ? 'primary' : 'outline-primary'} onClick={() => props.setView("month")}> {isMobile ? 'M' : 'Month'} </Button>
                    <Button variant={props.view === 'year' ? 'primary' : 'outline-primary'} onClick={() => props.setView("year")} disabled> {isMobile ? 'Y' : 'Year'} </Button>
                </ButtonGroup>

                {todayButton}
            </div>
        );

        const username = (
            <div className="account">
                <p className="text-end">
                    <Link to="/logout" className="text-decoration-none"> {isMobile ? props.user.name.match(/[A-Z]/g).join('') : props.user.name} <ChevronCompactRight /></Link>
                </p>
            </div>
        );

        let viewAdjust = false;
        let displayDate = "MMMM";
        let displayDateLight = "YYYY";

        if (props.view === "month") {
            viewAdjust = "months";
            displayDate = "MMMM";
            displayDateLight = "YYYY";

            if (isMobile) {
                displayDate = "MMM";
                displayDateLight = "YY";
            }
        }
        else if (props.view === "year") {
            viewAdjust = "years";
            displayDate = "YYYY";
            displayDateLight = false;
        }

        return (
            <div className="top-nav container">
                <div className="row">
                    <div className="col">
                        {viewButtons}
                    </div>

                    <div className={currentDateClassName}>
                        <div>
                            <h3 className="text-center">
                                <span className="chevron" onClick={() => props.setViewDate(moment(props.viewDate).subtract(1, viewAdjust))}><ChevronLeft /></span>
                                <span>{moment(props.viewDate).format(displayDate)} </span>
                                {displayDateLight === false ? "" : <span className="fw-lighter">{moment(props.viewDate).format(displayDateLight)}</span>}
                                <span className="chevron" onClick={() => props.setViewDate(moment(props.viewDate).add(1, viewAdjust))}><ChevronRight /></span>
                            </h3>
                        </div>
                    </div>

                    <div className="col">
                        {username}
                    </div>
                </div>
            </div>
        );
    }
};

export default TopNav;
