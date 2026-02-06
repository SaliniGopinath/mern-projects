import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { configpath } from "../util/config";

const Signup = () => {
  const navigate = useNavigate();
  const [signupform, setForm] = useState({
  fullname: "",
  email: "",
  password: "",
  phone: ""
  });

  const handleChange = (e) => {
  setForm({ ...signupform, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  await axios.post(configpath + "/user/signup", signupform);
  navigate('/login');
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row
        className="shadow p-5 rounded-4"
        style={{ backgroundColor: "#f7f2e9", maxWidth: "450px", width: "100%" }}
      >
        <Col>
          <h2 className="text-center mb-4" style={{ color: "#4b2e1f" }}>
            Create Your Account
          </h2>

          <Form onSubmit={handleSubmit}>
            {/* Full Name */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label style={{ color: "#4b2e1f" }}>Full Name</Form.Label>
              <Form.Control type="text" value={signupform.fullname} name="fullname" 
              onChange={handleChange} placeholder="Enter full name" />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ color: "#4b2e1f" }}>Email</Form.Label>
              <Form.Control type="email" value={signupform.email} name="email" 
              onChange={handleChange} placeholder="Enter email" />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: "#4b2e1f" }}>Password</Form.Label>
              <Form.Control type="password" value={signupform.password} name="password" 
              onChange={handleChange} placeholder="Enter password" />
            </Form.Group>

            {/* Phone */}
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label style={{ color: "#4b2e1f" }}>Phone Number</Form.Label>
              <Form.Control type="text"value={signupform.phone} name="phone" 
              onChange={handleChange} placeholder="Enter phone number" />
            </Form.Group>

            {/* Button */}
            <Button
              type="submit"
              className="w-100 mt-3"
              style={{
                backgroundColor: "#4b2e1f",
                border: "none",
                padding: "10px",
              }}
            >
              Sign Up
            </Button>

            {/* Links */}
            <div className="text-center mt-3">
              <a
                href="/login"
                style={{
                  color: "#4b2e1f",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Already have an account? Login
              </a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
