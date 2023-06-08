import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCategoryThunk } from "../store/slices/products.slice";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { addItemCartThunk } from "../store/slices/cart.slice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [items, setItems] = useState(1);
  const allProducts = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const productsFiltered = allProducts.filter(
    (product) => product.id !== Number(id)
  );

  useEffect(() => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}/`)
      .then((resp) => {
        console.log(resp.data);
        setProduct(resp.data);
        dispatch(filterCategoryThunk(resp.data.category.id));
      })
      .catch((error) => console.error(error));
  }, []);

  const decrement = () => {
    if (items > 1) {
      setItems(items - 1);
    }
  };

  const addToCart = () => {
    const cart = {
      quantity: items,
      productId: product.id,
    }
    dispatch(addItemCartThunk(cart))
  };

  return (
    <div>
      <Row>
        <Col>
          <h3>Home * {product.title}</h3>
          <img src={product?.images?.[0]?.url} alt="" />
        </Col>
        <Col>
          <div>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <div className="products-items">
              <Button variant="dark" onClick={() => decrement()}>
                -
              </Button>
              <span>{items}</span>
              <Button variant="dark" onClick={() => setItems(items + 1)}>
                +
              </Button>
            </div>
          </div>
          <Button className="primary" variant="dark" onClick={addToCart}>
            Add to card
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Productos relacionados</h3>
          <ListGroup>
            {productsFiltered.map((product) => (
              <ListGroup key={product.id}>{product.title}</ListGroup>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
