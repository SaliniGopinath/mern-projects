import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { configpath } from "../util/config";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const OrderSummary = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setshippingAddress] = useState(null);

  useEffect(()=>{
      fetchCartItems();
      fetchAddress();
    },[]);

     const fetchCartItems = async () => {
            try {
            const user = JSON.parse(localStorage.getItem("user"));
            const res = await axios.get(configpath + "/cart/getcart/" + user._id);
            setCartItems(res.data.data);
            } catch (err) {
            console.log("Error fetching cart", err);
            }
        };
    const fetchAddress = async () => {
            try {
            const user = JSON.parse(localStorage.getItem("user"));
            const res = await axios.get(configpath + "/order/getaddress/" + user._id);
            setshippingAddress(res.data.data[0]);
            } catch (err) {
            console.log("Error fetching address", err);
            }
        };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = 5;
  const total = subtotal + deliveryFee;

  if (!shippingAddress || cartItems.length === 0) {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <h5>Loading order summary...</h5>
    </div>
  );
}

const handleSubmit = async(e) =>{
  try 
      {e.preventDefault();
      const user = JSON.parse(localStorage.getItem("user"));
      const orderData = {
          userId: user._id,
          cartItems: cartItems,
          amount:total,
          address:shippingAddress
        };

      await axios.post(configpath + "/order/addorder", orderData);
      await axios.delete(configpath + `/cart/deletecart/${orderData.userId}`)
      navigate("/ordersuccess")
    }
  catch (error) {
          console.log("Order placing failed", error);
        }
}


  return (
    <div className="summary-bg">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        
        <Card className="summary-card shadow-sm" style={{width:"500px"}}>
          <form onSubmit={handleSubmit}>
          <Card.Body>
            <h3 className="text-center mb-4">Order Summary</h3>

            <div className="summary-section">
              <h6 className="bold" style={{color:"#4b2e1f"}}>Delivery Address</h6>
              <p className="mb-0">
                <strong>{shippingAddress?.fullname}</strong><br />
                {shippingAddress?.housename}, {shippingAddress?.city}<br />
                {shippingAddress?.state} - {shippingAddress?.pincode}<br />
                Phone: {shippingAddress?.phone}<br/>
                Email: {shippingAddress?.email}
              </p>
            </div>

            <div className="summary-section">
              <h6 style={{color:"#4b2e1f",paddingTop: "10px"}}>Items</h6>
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="d-flex justify-content-between summary-item"
                >
                  <span>
                    {item.productname} × {item.quantity}
                  </span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="summary-section">
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Delivery</span>
                <span>${deliveryFee}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Button
            type="submit"
                variant="dark"
              className="summary-btn w-100 mt-3"
            >
              Place Order
            </Button>
          </Card.Body>
          </form>
        </Card>
      </Container>
    </div>
  );
};

export default OrderSummary;
