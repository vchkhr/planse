import React from 'react';


export const ScreenSmall = () => {
    return (
        <div className="px-4 py-5 my-5 text-center">
            <img className="mx-auto mb-4" src="logo.png" alt="Desktop Computer" width="72" height="72" />
            <img className="mx-auto mb-4" src="img/desktop-computer.png" alt="Desktop Computer" width="72" height="72" />

            <h1 className="display-6 fw-bold">PLANSE Can't Work On This Screen</h1>
            <p className="lead mb-4">Please resize the window to make it wider. If the window is full screen, use another larger screen device such as a desktop computer.</p>
        </div>
    );
};

export default ScreenSmall;
