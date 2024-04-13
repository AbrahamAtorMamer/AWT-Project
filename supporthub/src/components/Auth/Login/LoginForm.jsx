import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import RegistrationForm from '../Signup/RegistrationForm';
//import ForgotPasswordForm from './ForgotPasswordForm'; // Import your ForgotPasswordForm component

const LoginForm = ({ onLogin }) => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false); // State for controlling Forgot Password modal

    const handleClose = () => {
        setShow(false);
        // Reset form fields and error message when the modal is closed
        setEmail('');
        setPassword('');
        setError('');
    };

    const handleShow = () => setShow(true);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLogin = () => {
        // Simulate login process
        if (email === 'user@example.com' && password === 'password') {
            // Successful login
            onLogin(); // Notify parent component about successful login
            handleClose();
        } else {
            // Failed login
            setError('Invalid email or password');
        }
    };

    const handleForgotPassword = () => {
        setShowForgotPassword(true); // Show Forgot Password modal
    };

    return (
        <>
            {/* <Button variant="outline-success" onClick={handleShow}>
                Login
            </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={handleEmailChange}
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </Form.Group>
                        {error && <div className="text-danger">{error}</div>}
                    </Form>
                    <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                        <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
                    </div>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }} className="d-grid gap-2">
                        <Button block variant="primary" size="lg" onClick={handleLogin}>
                            Login
                        </Button>
                    </div>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                        <Link to="/register">New User?Click Here</Link>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    
                    
                </Modal.Footer>
            </Modal>

            {/* Render ForgotPasswordForm component if showForgotPassword is true */}
            {/* <ForgotPasswordForm show={showForgotPassword} onClose={() => setShowForgotPassword(false)} /> */}
        </>
    );
};

export default LoginForm;
