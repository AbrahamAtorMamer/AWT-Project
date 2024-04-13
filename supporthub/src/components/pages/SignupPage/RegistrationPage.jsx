import React, { useState } from 'react';
import { Alert, Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from "axios";

const RegistrationPage = () => {
    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Exclude confirmPassword field from formData
            const { confirmPassword, ...formDataWithoutConfirmPassword } = formData;

            const response = await axios.post('http://localhost:3000/users/register', formDataWithoutConfirmPassword);
            console.log('Data posted:', response.data);
            setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };


    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

            <div>
                {success && (
                    <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                        Registration successful!
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group as={Col} controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    {error && <div className="text-danger">{error}</div>}
                </Form>
                <div style={{ textAlign: 'center', marginBottom: '10px' }} className="d-grid gap-2">
                    <Button style={{ textAlign: 'center', marginBottom: '10px' }} variant="primary" size="lg" onClick={handleSubmit}>
                        Register
                    </Button>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <Link to="/login">Have an account? Click Here</Link>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;
