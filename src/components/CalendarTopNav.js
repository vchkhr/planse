import React from 'react';


export const CalendarTopNav = (props) => {
    if (props.userLoaded === false) {
        return (
            <div>Loading user information...</div>
        );
    }
    else {
        return (
            <div className="top-nav">
                <div>
                    
                </div>
            </div>
        );
    }
};

export default CalendarTopNav;
