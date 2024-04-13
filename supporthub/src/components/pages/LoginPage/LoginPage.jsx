import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Form, Row, Col } from 'react-bootstrap';
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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    try {
      // set configurations
      const configuration = {
        method: "post",
        url: "http://localhost:3000/users/login",
        data: {
          email,
          password,
        },
      };

      // make the API call
      const response = await axios(configuration);
      console.log(response);

      // Redirect to home page if login is successful
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('Incorrect email/password');
    }
  };

  return (
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
            <Input label="Email" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
          </CardBody>
        </Form>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleSubmit}>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
