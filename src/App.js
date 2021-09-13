import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';

import Calendar from './components/Calendar';
import CalendarCreate from './components/CalendarCreate';
import CalendarEdit from './components/CalendarEdit';
import CalendarUpdateMain from './components/CalendarUpdateMain';


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
            <BrowserRouter>
                <Nav user={user} setUser={setUser} />

                <Route path="/" exact component={() => <Calendar user={user} userLoaded={userLoaded} />} />
                <Route path="/login" component={() => <Login setUser={setUser} />} />
                <Route path="/register" component={() => <Register setUser={setUser} />} />
                <Route path="/logout" component={() => <Logout user={user} setUser={setUser} />} />

                <Route path="/calendar/create" component={() => <CalendarCreate user={user} />} />
                <Route path="/calendar/edit/:id" component={() => <CalendarEdit />} />
                <Route path="/calendar/updateMain/:id" component={() => <CalendarUpdateMain user={user} setUser={setUser} />} />
            </BrowserRouter>
        </div>
    );
}

export default App;
