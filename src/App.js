import React, { useEffect, useState } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Login from './components/account/Login';
import Register from './components/account/Register';
import Logout from './components/account/Logout';

import CalendarMain from './components/CalendarMain';
import CalendarCreate from './components/calendars/CalendarCreate';
import CalendarEdit from './components/calendars/CalendarEdit';
import CalendarUpdateMain from './components/calendars/CalendarUpdateMain';
import CalendarDelete from './components/calendars/CalendarDelete';

import EventCreate from './components/events/EventCreate';
import ArrangementCreate from './components/events/ArrangementCreate';
import ReminderCreate from 'components/events/ReminderCreate';
import TaskCreate from 'components/events/TaskCreate';


function App() {
    const [user, setUser] = useState([]);
    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        setUserLoaded(false);

        fetch(process.env.REACT_APP_DOMAIN + '/api/user', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
            .then(
                response => {
                    if (response.ok) {
                        return response;
                    }
                    else {
                        let error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;

                        throw error;
                    }
                },
                error => {
                    throw error;
                }
            )
            .then(response => response.json())
            .then(response => {
                setUser(response);
                setUserLoaded(true);
            })
            .catch(error => {
                setUserLoaded(true);
            });
    }

    return (
        <div className="App">
            <HashRouter>
                <Route path="/" exact component={() => <CalendarMain user={user} userLoaded={userLoaded} />} />
                <Route path="/login" component={() => <Login setUser={setUser} />} />
                <Route path="/register" component={() => <Register setUser={setUser} />} />
                <Route path="/logout" component={() => <Logout user={user} setUser={setUser} />} />

                <Route path="/calendar/create" component={() => <CalendarCreate user={user} />} />
                <Route path="/calendar/edit/:id" component={() => <CalendarEdit user={user} />} />
                <Route path="/calendar/editMain/:id" component={() => <CalendarUpdateMain user={user} setUser={setUser} />} />
                <Route path="/calendar/delete/:id" component={() => <CalendarDelete user={user} />} />

                <Route path="/event/create" component={() => <EventCreate user={user} />} />
                <Route path="/arrangement/create" component={() => <ArrangementCreate user={user} />} />
                <Route path="/reminder/create" component={() => <ReminderCreate user={user} />} />
                <Route path="/task/create" component={() => <TaskCreate user={user} />} />
            </HashRouter>
        </div>
    );
}

export default App;
