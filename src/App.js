import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';

function App() {
    const [name, setName] = useState('');

    useEffect(() => {
        (
            async () => {
                return fetch(process.env.REACT_APP_DOMAIN + '/api/user', {
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
                    })
                    .catch(error => {
                        console.log("User Request error:");
                        console.log(error);
                    });
            }
        )();
    });

    return (
        <div className="App">
            <BrowserRouter>
                <Nav name={name} setName={setName} />

                <div className="container mainDiv">
                    <Route path="/" exact component={() => <Home name={name} />} />
                    <Route path="/login" component={() => <Login setName={setName} />} />
                    <Route path="/register" component={Register} />
                    <Route path="/logout" component={() => <Logout name={name} setName={setName} />} />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
