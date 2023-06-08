import Offcanvas from "react-bootstrap/Offcanvas";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk, updateCartThunk, purchaseCartThunk } from "../store/slices/cart.slice";
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
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            {cart.map((cartItem) => (
              <li key={cartItem.id}>
                <h5>{cartItem.product.title}</h5>
                <img src={cartItem.product.images[0].url} alt="" />
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
