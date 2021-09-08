import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Redirect, withRouter } from 'react-router-dom';

import './App.css';

import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    const [name, setName] = useState('');

    useEffect(() => {
        (
            async () => {
                return fetch('http://localhost:8000/api/user', {
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
                        console.log("/api/user error");

                        return (
                            <div>No</div>
                        );
                    });

                // const content = await response.json();

                // setName(content.name);
            }
        )();
    });

    return (
        <div className="App">
            <BrowserRouter>
                {/* <Nav name={name} setName={setName} /> */}

                <div className="container mainDiv">
                    <Route path="/" exact component={() => <Home name={name} />} />
                    <Route path="/login" component={() => <Login setName={setName} />} />
                    <Route path="/register" component={Register} />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
