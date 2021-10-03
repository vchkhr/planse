import React, { useState } from 'react';
import { Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';
import { Redirect, Link } from 'react-router-dom';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [registerRedirect, setRegisterRedirect] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [toast, setToast] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setRegisterError('');

        fetch(process.env.REACT_APP_DOMAIN + '/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
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
                setRegisterRedirect(true);
                setRegisterError('');
                setToast(false);
                // props.setUser(response);
            })
            .catch(error => {
                setRegisterError(error.toString());
                setToast(true);
            });
    }

    if (registerRedirect) {
        return (
            <Redirect to={{ pathname: '/login', state: { justRegistered: 'true' } }}
            />
        );
    }

    let registerErrorText = (
        <Toast onClose={() => setToast(false)} show={toast} delay={5000} autohide>
                <Toast.Header>
                    <img src="logo-20x20.png" className="rounded me-2" alt="PLANSE" />
                    <strong className="me-auto">Register Error</strong>
                </Toast.Header>
                <Toast.Body>{registerError}</Toast.Body>
            </Toast>
    );
    if (registerError === 'Error: Error 409: Conflict' || registerError === 'Error: Error 409: ') {
        registerErrorText = (
            <Toast onClose={() => setToast(false)} show={toast} delay={5000} autohide>
                <Toast.Header>
                    <img src="logo-20x20.png" className="rounded me-2" alt="PLANSE" />
                    <strong className="me-auto">Register Error</strong>
                </Toast.Header>
                <Toast.Body>This email is already registered.</Toast.Body>
            </Toast>
        );
    }

    return (
        <div>
            <ToastContainer position="bottom-end" className="p-3">
                {registerError ? registerErrorText : ''}
            </ToastContainer>

            <Form className="register" onSubmit={submit}>
                <p className="text-center">
                    <img className="mb-4" src="/logo.png" alt="PLANSE" />
                </p>

                <h1 className="h3 mb-3 fw-normal text-center">Register on PLANSE</h1>

                <p className="text-center">
                    <Link to="/login">Login instead</Link>
                </p>

                <Form.Floating controlid="formName">
                    <Form.Control type="text" className="top" placeholder="Ed Baldwin" onChange={e => setName(e.target.value)} required />
                    <Form.Label>Name</Form.Label>
                </Form.Floating>

                <Form.Floating controlid="formEmail">
                    <Form.Control type="email" className="middle" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} required />
                    <Form.Label>Email address</Form.Label>
                </Form.Floating>

                <Form.Floating controlid="formPassword">
                    <Form.Control type="password" className="bottom" placeholder="password" onChange={e => setPassword(e.target.value)} required />
                    <Form.Label>Password</Form.Label>
                </Form.Floating>

                <Button variant="primary" type="submit" size="lg" className="w-100">Register <BoxArrowRight /></Button>

                <p className="mt-3 mb-3 text-muted text-center">You will be redirected to the login page.<br />Email verification doesn't needed.<br />We'll never share your email with anyone else</p>

                <p className="mt-5 mb-3 text-muted text-center">&copy; PLANSE, 2021</p>
            </Form>
        </div>
    );
};

export default Register;
