import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { useLocation } from 'react-router';
import { Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import { BoxArrowInRight } from 'react-bootstrap-icons';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginRedirect, setLoginRedirect] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [toast, setToast] = useState(false);

    const [toastRegistered, setToastRegistered] = useState(true);

    let justRegistered = useLocation().state;

    const submit = async (e) => {
        e.preventDefault();
        setLoginError('');
        setToast(false);

        fetch(process.env.REACT_APP_DOMAIN + '/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
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
                setLoginRedirect(true);
                setLoginError('');
                props.setUser(response);
                setToastRegistered(false);
            })
            .catch(error => {
                setLoginError(error.toString());
                setToast(true);
                setToastRegistered(false);
            });
    }

    if (loginRedirect) {
        return <Redirect to="/" />;
    }

    let loginErrorText = (
        <Toast onClose={() => setToast(false)} show={toast} delay={5000} autohide>
            <Toast.Header>
                <img src="logo-20x20.png" className="rounded me-2" alt="PLANSE" />
                <strong className="me-auto">Invalid Login</strong>
            </Toast.Header>
            <Toast.Body>{loginError}</Toast.Body>
        </Toast>
    );
    if (loginError === 'Error: Error 401: Unauthorized' || loginError === 'Error: Error 401: ') {
        loginErrorText = (
            <Toast onClose={() => setToast(false)} show={toast} delay={5000} autohide>
                <Toast.Header>
                    <img src="logo-20x20.png" className="rounded me-2" alt="PLANSE" />
                    <strong className="me-auto">Invalid Login</strong>
                </Toast.Header>
                <Toast.Body>Email or password incorrect.</Toast.Body>
            </Toast>
        );
    }

    let justRegisteredText = (
        <div></div>
    );
    if (justRegistered !== undefined && !loginError) {
        if (justRegistered['justRegistered'] !== 'false') {
            justRegisteredText = (
                <Toast onClose={() => setToastRegistered(false)} show={toastRegistered} delay={5000} autohide>
                    <Toast.Header>
                        <img src="logo-20x20.png" className="rounded me-2" alt="PLANSE" />
                        <strong className="me-auto">Account Registered</strong>
                    </Toast.Header>
                    <Toast.Body>Now you can login with your email and password.</Toast.Body>
                </Toast>
            );
        }
    }

    return (
        <div>
            <ToastContainer position="bottom-end" className="p-3">
                {loginError ? loginErrorText : ''}
                {justRegisteredText}
            </ToastContainer>

            <Form className="formCard" onSubmit={submit}>
                <p className="text-center">
                    <img className="mb-4" src="/logo.png" alt="PLANSE" />
                </p>

                <h1 className="h3 mb-3 fw-normal text-center">Login to PLANSE</h1>

                <p className="text-center">
                    <Link to="/register">Register instead</Link>
                </p>

                <Form.Floating controlId="formEmail">
                    <Form.Control type="email" className="top" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} required />
                    <Form.Label>Email</Form.Label>
                </Form.Floating>

                <Form.Floating controlId="formPassword">
                    <Form.Control type="password" className="bottom" placeholder="password" onChange={e => setPassword(e.target.value)} required />
                    <Form.Label>Password</Form.Label>
                </Form.Floating>

                <Button variant="primary" type="submit" size="lg" className="w-100">Log in <BoxArrowInRight /></Button>

                <p className="mt-5 mb-3 text-muted text-center">&copy; PLANSE, 2021</p>
            </Form>
        </div>
    );
};

export default Login;
