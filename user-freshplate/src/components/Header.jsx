import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser } from "../util/auth";
import { useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  
const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, [location]);

  console.log("userrr",user);
  console.log("loc",location);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#f7f2e9" }} className="shadow-sm py-3">
      <Container>
        <Navbar.Brand onClick={() => navigate("/about")}>
          <img src="/fresh-plate-logo.jpeg" alt="logo" width="40" />
          <span className="ms-2 fw-semibold" style={{ color: "#4b2e1f" }}>
            Fresh Plate
          </span>
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Nav.Link onClick={() => navigate("/menu")}>Menu</Nav.Link>
          <Nav.Link onClick={() => navigate("/about")}>About</Nav.Link>


          {user ? (
            <>
              <Nav.Link>
                Hi, {user.fullname}
              </Nav.Link>
              <Nav.Link onClick={logout}>
                Logout
              </Nav.Link>
            </>
          ) : (
             <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
