import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const UserBody = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Row
        className="align-items-center shadow-lg rounded-4 p-5 mt-5"
        style={{ backgroundColor: "#f7f2e9" }}
      >
        <Col md={6}>
          <h1 style={{ fontSize: "48px", fontWeight: "700", color: "#4b2e1f" }}>
            Welcome to Fresh Plate
          </h1>

          <p className="mt-3" style={{ color: "#5a4637", lineHeight: "1.6" }}>
            Enjoy delicious meals made with fresh ingredients. <br/> 
            Experience flavors that comfort, excite, and inspire.
          </p>

          <Button
            className="mt-4" onClick={() => navigate("/menu")}
            style={{
              backgroundColor: "#4b2e1f",
              border: "none",
              padding: "10px 30px",
            }}
          >
            View Menu
          </Button>
        </Col>

        <Col md={6}>
          <img
            src="/foodicon.png"
            alt="Dish"
            className="img-fluid rounded-4"
            style={{width:400}}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UserBody;
