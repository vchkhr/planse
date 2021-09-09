import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Calendar from './components/Calendar';


function App() {
    const [user, setUser] = useState([]);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        setUserLoading(true);

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
                setUserLoading(false);
            })
            .catch(error => {
                setUserLoading(false);
            });
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Nav user={user} setUser={setUser} />

                <Route path="/" exact component={() => <Calendar user={user} userLoading={userLoading} />} />
                <Route path="/login" component={() => <Login setUser={setUser} />} />
                <Route path="/register" component={Register} />
                <Route path="/logout" component={() => <Logout user={user} setUser={setUser} />} />
            </BrowserRouter>
        </div>
    );
}

export default App;
