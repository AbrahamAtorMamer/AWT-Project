import React, { useState } from 'react';
import { Alert, Form, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import NavBar from '../../components/NavBar/NavBar';

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
    const [success, setSuccess] = useState(false); // State for showing success message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form fields
        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
            setError('Please fill in all fields');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            // Exclude confirmPassword field from formData
            const { confirmPassword, ...formDataWithoutConfirmPassword } = formData;

            const response = await axios.post('http://localhost:3000/users/register', formDataWithoutConfirmPassword);
            console.log('Data posted:', response.data);
            setSuccess(true); // Set success state to true upon successful registration
            setFormData(initialFormData); // Reset form data
            // Redirect user to dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Error posting data:', error);
            setError('Registration failed. Please try again.'); // Set error message if registration fails
        }
    };

    return (
        <>
            <NavBar />
            <div className="flex justify-center items-center h-screen">
                <Card color="transparent" shadow={false}>
                    <Typography variant="h4" color="blue-gray">
                        Sign Up
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Nice to meet you! Enter your details to register.
                    </Typography>
                    {success && ( // Display success message if registration is successful
                        <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                            Registration successful!
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        {/* Input fields */}
                        <div className="mb-1 flex flex-col gap-6">
                            <Input
                                size="lg"
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                autoFocus
                            />
                            <Input
                                size="lg"
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            <Input
                                label="Email"
                                size="lg"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <Input
                                type="password"
                                size="lg"
                                label="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <Input
                                type="password"
                                size="lg"
                                label="Confirm Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Checkbox for Terms and Conditions */}
                        {error && <div className="text-danger">{error}</div>} {/* Display error message if registration fails */}
                        <Button className="mt-6" fullWidth onClick={handleSubmit}>
                            Sign Up
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Already have an account?{' '}
                            <Link to="/login">Sign In</Link>
                        </Typography>
                    </form>
                </Card>
            </div>
        </>
    );
}

export default RegistrationPage;
