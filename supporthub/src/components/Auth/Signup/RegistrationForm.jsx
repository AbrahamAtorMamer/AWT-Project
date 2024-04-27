import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import NavBar from '../../NavBar/NavBar';


const RegistrationForm = ({ onRegister }) => {
    const [show, setShow] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleClose = () => {
        setShow(false);
        // Reset form fields and error message when the modal is closed
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    };

    const handleShow = () => setShow(true);

    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleRegister = () => {
        // Basic validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Simulate registration process
        // Here you can send registration data to your backend API
        console.log('Registration successful');
        onRegister(); // Notify parent component about successful registration
        handleClose();
    };


    return (
        <>
            {/* <Button variant="outline-success me-2" onClick={handleShow}>
                Register
            </Button> */}
                <NavBar/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration
                        
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={handleLastNameChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={handleEmailChange}
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

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                        </Form.Group>

                        {error && <div className="text-danger">{error}</div>}
                    </Form>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }} className="d-grid gap-2">
                    <Button style={{ textAlign: 'center', marginBottom: '10px' }} variant="primary" size="lg" onClick={handleRegister}>
                        Register
                    </Button>
                    </div>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                        <Link to="/login">Have an account? Click Here</Link>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RegistrationForm;
