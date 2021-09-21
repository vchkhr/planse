import React from 'react';


export const CalendarTopNav = (props) => {
    if (props.userLoaded === false) {
        return (
            <div className="text-center mt-5">
                <p>Loading user information...</p>
            </div>
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
