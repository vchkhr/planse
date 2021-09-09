import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Calendar from './components/Calendar';

function App() {
    const [name, setName] = useState('');
    const [loadingUser, setLoadingUser] = useState(false)
    const [userLoaded, setUserLoaded] = useState(false)
    const [mainCalendar, setMainCalendar] = useState('')

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        setLoadingUser(true);

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
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
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
                setName(response.name);
                setMainCalendar(response.main_calendar);
                setLoadingUser(false);
                setUserLoaded(true);
            })
            .catch(error => {
                console.log("User Request error:");
                console.log(error);
                setLoadingUser(false);
            });
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Nav name={name} setName={setName} />

                <Route path="/" exact component={() => <Calendar name={name} mainCalendar={mainCalendar} userLoaded={userLoaded} />} />
                <Route path="/login" component={() => <Login setName={setName} />} />
                <Route path="/register" component={Register} />
                <Route path="/logout" component={() => <Logout name={name} setName={setName} />} />
            </BrowserRouter>
        </div>
    );
}

export default App;
