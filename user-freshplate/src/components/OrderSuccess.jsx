import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="summary-bg">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="summary-card shadow-sm text-center" style={{ width: "500px" }}>
          <Card.Body>
            <h3 className="mb-2">Order Placed Successfully!</h3>
            <p className="text-muted">
              Thank you for your purchase.  
              Your order has been confirmed and will be delivered soon.
            </p>

            <Button
              variant="dark"
              className="summary-btn w-100 mt-3"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default OrderSuccess;
