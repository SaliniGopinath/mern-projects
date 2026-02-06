import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { configpath } from "../util/config";
import { isLoggedIn } from "../util/auth";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(configpath + "/cart/getcart/" + user._id);
      setCartItems(res.data.data);
    } catch (err) {
      console.log("Error fetching cart", err);
    }
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

    const editCart = async (dish, newQuantity) => {
      if (!isLoggedIn()) {
        navigate("/login");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));

      const cartData = {
        userId: user._id,
        productId: dish.productId,
        quantity: Number(newQuantity)
      };

      await axios.put(configpath + "/cart/editcart", cartData);

      setCartItems(prev =>
        prev.map(item =>
          item.productId === dish.productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    };



  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">My Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <>
          <Row>
            {cartItems.map((item) => (
              <Col md={12} key={item._id} className="mb-3">
                <Card className="shadow-sm">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{item.productname}</h5>
                      <p className="mb-1">Price: ${item.price}</p>
                      {/* <p className="mb-0">Quantity: {item.quantity}</p> */}
                      <p>
                        <div className="d-flex justify-content-center align-items-center mb-3">
                        <Button
                          variant="outline-dark"
                          onClick={() => {
                            const newQty = Number(item.quantity) - 1;
                            if (newQty >= 1) editCart(item, newQty);
                          }}
                        >
                          -
                        </Button>

                        <span className="mx-3 fw-bold">{item.quantity}</span>

                        <Button
                          variant="outline-dark"
                          onClick={() =>{
                             const newQty = Number(item.quantity) + 1;
                              editCart(item, newQty);
                          }}
                        >
                          +
                        </Button>
                      </div>
                      </p>
                    </div>

                    <h5>${item.price * item.quantity}</h5>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <hr />

          <div className="d-flex justify-content-between align-items-center">
            <h4>Total: ${totalAmount}</h4>
            <Button
              variant="dark"  onClick={() => navigate("/address")}
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
