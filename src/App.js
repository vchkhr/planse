import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Nav />

                <div className="container mt-5 mainDiv">
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
