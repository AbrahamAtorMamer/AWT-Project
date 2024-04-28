// Import necessary modules
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Alert, Form } from 'react-bootstrap';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import {setAuthToken} from '../../helpers/setAuthToken'
import NavBar from '../../components/NavBar/NavBar';

const LoginPage = () => {
  // Initialize state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false); // State for showing success toast
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
      // Validate email and password
      if (!email.trim() || !password.trim()) {
        setError('Please enter both email and password');
        return;
    }
    const loginPayload = {
      email: email,
      password: password
    };
  
    try {
      const response = await axios.post("http://localhost:3000/users/login", loginPayload);
  
      // Check if the response includes the token
      if (!response.data || !response.data.data || !response.data.data.token) {
        throw new Error("Token is missing in response");
      }
  
      const token = response.data.data.token;
  
      // Set token to local storage
      localStorage.setItem("token", token);
      console.log('After the localStorage.setItem')
      console.log(token)
      // Set token to axios common header
      setAuthToken(token);
      console.log('After the setAuthToken')
      console.log(token)
  
      // Redirect user to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error("Error:", error);
      setError('Incorrect email or password');
      // Show success toast
      setShowSuccessToast(true);
    }
  };
  

  return (
    <>
    <NavBar/>
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <Form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Input type='email' label="Email" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type='password' label="Password" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <Alert variant="danger">{error}</Alert>}
          </CardBody>
        </Form>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleSubmit}>
            Sign In
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don&apos;t have an account?{" "}
            <Link to="/registration">Sign Up</Link>
          </Typography>
        </CardFooter>
      </Card>
      {/* Toast notification for successful login */}
      {showSuccessToast && (
        <div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">Successfully logged in!</p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      type="button"
                      className="inline-flex bg-white rounded-md p-1.5 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setShowSuccessToast(false)}
                    >
                      <span className="sr-only">Dismiss</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-2.828-3.172a1 1 0 011.414-1.414L10 8.586l2.828-2.828a1 1 0 111.414 1.414L11.414 10l2.828 2.828a1 1 0 11-1.414 1.414L10 11.414l-2.828 2.828a1 1 0 01-1.414-1.414L8.586 10 5.758 7.172a1 1 0 111.414-1.414L10 8.586l2.828-2.828a1 1 0 011.414 1.414L11.414 10l2.828 2.828a1 1 0 11-1.414 1.414L10 11.414l-2.828 2.828a1 1 0 01-1.414-1.414L8.586 10 5.758 7.172z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default LoginPage;
