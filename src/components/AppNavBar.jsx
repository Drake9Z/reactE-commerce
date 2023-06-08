import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import SideCart from "./SideCart";
import { useNavigate } from "react-router-dom";
import '../App.css'

function AppNavbar() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    const tokenValue = localStorage.getItem("token");

    if (tokenValue) {
      setShow(true);
      console.log(tokenValue);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{color: "#4361ee", fontWeight: 700}}>
            E-commerce
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-pages">
              <Nav.Link as={Link} to="/login" className="navbar-icon">
                <i className='bx bx-user'></i>
              </Nav.Link>
              <Nav.Link as={Link} to="/purchases" className="navbar-icon">
                <i className='bx bx-box'></i>
              </Nav.Link>
              <Nav.Link onClick={handleShow} className="navbar-icon">
                <i className='bx bx-cart-alt' ></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SideCart show={show} handleClose={handleClose} />
    </>
  );
}

export default AppNavbar;
