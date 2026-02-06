import React, { useEffect, useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { configpath } from "../util/config";
import { getUser } from "../util/auth";
import { useNavigate } from "react-router-dom";

const ShippingAddress = ({ onSubmit }) => {
  const user = getUser();
  const userId = user?._id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    housename: "",
    city: "",
    state: "",
    pincode: ""
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('id',user._id);
        
        const res = await axios.get(
          configpath + '/user/getuserbyid/' + user._id
        );

        setFormData(prev => ({
          ...prev,
          fullname: res.data.fullname || "",
          email: res.data.email || "",
          phone: res.data.phone || ""
        }));
      } catch (err) {
        console.log("Error fetching user data", err);
      }
    };

    fetchUser();
  }, [user._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const addressform = {
        ...formData,
        userId: userId
    };
    await axios.post(configpath + "/order/addaddress", addressform);
    navigate("/ordersummary")
  };

 return (
  <Container
    fluid
    className="d-flex justify-content-center align-items-start"
    style={{ minHeight: "calc(100vh - 80px)", paddingTop: "40px" }}
  >
    <Card className="p-4 shadow-sm" style={{ width: "420px" }}>
      <h4 className="mb-3 text-center">Shipping Address</h4>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            name="housename"
            placeholder="House / Street / Area"
            value={formData.housename}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100" >
          Continue
        </Button>
      </Form>
    </Card>
  </Container>
);


};

export default ShippingAddress;
