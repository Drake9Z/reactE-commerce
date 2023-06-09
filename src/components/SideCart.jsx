import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartThunk,
  updateCartThunk,
  purchaseCartThunk,
} from "../store/slices/cart.slice";
import Button from "react-bootstrap/Button";

const SideCart = ({ show, handleClose }) => {
  const [items, setItems] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const decrement = () => {
    if (items > 1) {
      setItems(items - 1);
    }
  };

  console.log(cart);

  const decrementQuant = (cartItem) => {
    dispatch(updateCartThunk(cartItem.id, cartItem.quantity - 1));
  };

  const incrementQuant = (cartItem) => {
    dispatch(updateCartThunk(cartItem.id, cartItem.quantity + 1));
  };

  return (
    <div>
      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            {cart.map((cartItem) => (
              <li key={cartItem.id} 
              style={{ listStyle: "none", paddingTop: 50}}>
                <Row>
                  <h6>{cartItem.product.title}</h6>
                  <Col>
                    <img
                    style={{height: 50, objectFit: "contain"}}
                    src={cartItem.product.images[0].url} alt="product image" 
                    />
                  </Col>
                  <Col>
                    <div className="products-items">
                      <Button
                        variant="dark"
                        disabled={cartItem.quantity === 1}
                        onClick={() => decrementQuant(cartItem)}
                      >
                        -
                      </Button>
                      <span>{cartItem.quantity}</span>
                      <Button
                        variant="dark"
                        onClick={() => incrementQuant(cartItem)}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                </Row>
              </li>
            ))}
          </ul>
          <Button onClick={() => dispatch(purchaseCartThunk())}>Buy</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default SideCart;
