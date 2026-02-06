import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from 'axios'
import { configpath } from "../util/config";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loginform,setForm] = useState({
    email:"",
    password:""
  })

  const handleChange = (e) =>{
    setForm({...loginform,[e.target.name]: e.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post(configpath + "/user/login", loginform);
      console.log("resss",res);
      
      localStorage.setItem("user", JSON.stringify(res.data.data));
      navigate('/menu');
    }
    catch(err){
      console.log("Login failed:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  }
  
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
            Login to Fresh Plate
          </h2>

          <Form onSubmit={handleSubmit}>
            {/* Email */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ color: "#4b2e1f" }}>Email</Form.Label>
              <Form.Control type="email" name="email" value={loginform.email} 
              onChange={handleChange} placeholder="Enter email" />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: "#4b2e1f" }}>Password</Form.Label>
              <Form.Control type="password" name="password" value={loginform.password} 
               onChange={handleChange} placeholder="Enter password" />
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
              Login
            </Button>
            <div className="text-center mt-3">
              {/* <a
                href="#"
                style={{
                  color: "#4b2e1f",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Forgot Password?
              </a> */}
              {/* <br /> */}
              <a
                href="/signup"
                style={{
                  color: "#4b2e1f",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                New User ? Create New Account
              </a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
