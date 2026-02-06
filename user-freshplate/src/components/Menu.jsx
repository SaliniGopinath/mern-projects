import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Modal } from "react-bootstrap";
import { BsCart } from "react-icons/bs";
import { configpath } from "../util/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../util/auth";

// import { useCart } from "../context/CartContext";


const Menu = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  // const [cart, setCart] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [menu,setMenu] = useState([]);
  // const { cart, addToCart } = useCart();
 const [cartitems, setCartItems] = useState([]);
 const [quantity, setQuantity] = useState(1);




  useEffect(()=>{
    fetchMenu();
    fetchCart();
  },[]);

  const fetchMenu = async()=>{
    try{
      const res = await axios.get(configpath+"/admin/getproducts")
      console.log('menu',res.data.data.products);
      setMenu(res.data.data.products)
    }
    catch(err){
      console.log("Error loading menu",err);
    }
  }

  const fetchCart = async () => {
  if (!isLoggedIn()) return;

  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(configpath + "/cart/getcart/" + user._id);
  setCartItems(res.data.data);
};
  const categories = ["All", "Salads", "Drinks", "Main Meals", "Desserts"];

  // const dishes = [
  //   { id: 1, name: "Green Salad", category: "Salads", price: 4.5, image: "/greensalad.png", description: "Fresh green salad with lettuce, cucumber, and a light dressing." },
  //   { id: 2, name: "Yogurt Salad", category: "Salads", price: 5.0, image: "/yogurt.png", description: "Creamy yogurt salad with fresh veggies and herbs." },
  //   { id: 3, name: "Lime Soda", category: "Drinks", price: 2.5, image: "/lime.png", description: "Refreshing lime soda with a hint of mint." },
  //   { id: 4, name: "Strawberry Mojito", category: "Drinks", price: 3.5, image: "/strawberry.png", description: "Sweet and tangy strawberry mojito." },
  //   { id: 5, name: "Mango Lassi", category: "Drinks", price: 3.0, image: "/lassi.png", description: "Creamy mango lassi with fresh mangoes." },
  //   { id: 6, name: "Chicken Biriyani", category: "Main Meals", price: 12.0, image: "/cb.png", description: "Spiced chicken biriyani cooked with fragrant rice." },
  //   { id: 7, name: "Veg Thali Meals", category: "Main Meals", price: 10.0, image: "/vegthali.png", description: "Assorted vegetarian dishes served with rice and chapati." },
  //   { id: 8, name: "Fish Thali Meals", category: "Main Meals", price: 13.5, image: "/fishthali.png", description: "Delicious fish curry with rice and sides." },
  //   { id: 9, name: "Payasam", category: "Desserts", price: 4.0, image: "/payasam.png", description: "Sweet Indian rice pudding flavored with cardamom." },
  //   { id: 10, name: "Tender Coconut Pudding", category: "Desserts", price: 4.5, image: "/tcp.png", description: "Soft pudding made with tender coconut and milk." },
  // ];

  const filteredDishes =
    category === "All"
      ? menu
      : menu.filter((dish) => dish.productcategory === category);

  const addToCart = async (dish) => {
    if (!isLoggedIn()) 
      {
        alert("Please login to add items to cart");
        navigate("/login");
        return;
      }
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("uid", user?._id);
  const cartdata = {
    userId : user._id,
    productId: dish.productId,
    productname : dish.productname,
    price: dish.price,
    quantity:quantity
  } 
  await axios.post(configpath + "/cart/addtocart", cartdata);
  setCartItems(prev => [...prev, { ...dish, quantity }]);
};


  const openModal = (dish) => {
    setSelectedDish(dish);
    setQuantity(1);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedDish(null);
    setShowModal(false);
  };

  console.log("dish",cartitems);

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-end mb-3 position-relative"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/cart")}>
        <BsCart size={30} />
        {cartitems.length > 0 && (
          <Badge
            bg="danger"
            pill
            className="position-absolute"
            style={{ top: 0, right: 0 }}
          >
            {cartitems.reduce((sum, i) => sum + Number(i.quantity), 0)}
          </Badge>
        )}
      </div>

      <h2 className="text-center mb-4" style={{ color: "#4b2e1f" }}>
        Freshly Serving
      </h2>

      <div className="text-center mb-4">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={cat === category ? "dark" : "outline-dark"}
            onClick={() => setCategory(cat)}
            className="me-2 mb-2"
          >
            {cat}
          </Button>
        ))}
      </div>

      
      <Row>
        {filteredDishes.map((dish) => (
          <Col key={dish.id} md={6} lg={4} className="mb-4">
            <Card
              style={{ border: "none", borderRadius: "10px", cursor: "pointer" }}
              className="shadow-sm"
              onClick={() => openModal(dish)}
            >
              <Card.Img
                variant="top"
                src={configpath + dish.productimage}
                style={{
                  width:"100%",
                  height: "100px",
                  objectFit: "contain",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              />
              <Card.Body className="text-center">
                <Card.Title style={{ color: "#4b2e1f" }}>{dish.productname}</Card.Title>
                <Card.Text style={{ fontWeight: "bold" }}>${dish.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

     
      {selectedDish && (
        <Modal show={showModal} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedDish.productname}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <img
              src={configpath + selectedDish.productimage}
              alt={selectedDish.productname}
              style={{ width: "100%", height: "250px", objectFit: "contain", borderRadius: "10px", marginBottom: "15px" }}
            />
            <p><strong>Category:</strong> {selectedDish.productcategory}</p>
            <p><strong>Price:</strong> ${selectedDish.price}</p>
            <p>{selectedDish.productdesc}</p>
            <div className="d-flex justify-content-center align-items-center mb-3">
                <Button
                  variant="outline-dark"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  -
                </Button>

                <span className="mx-3 fw-bold">{quantity}</span>

                <Button
                  variant="outline-dark"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  +
                </Button>
              </div>

            <Button
              style={{ backgroundColor: "#4b2e1f", border: "none" }}
              onClick={() => {
                addToCart(selectedDish);
                closeModal();
              }}
            >
              Add to Cart
            </Button>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default Menu;
