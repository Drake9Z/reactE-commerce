import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCategoryThunk, getProductsThunk } from "../store/slices/products.slice";
import { addItemCartThunk } from "../store/slices/cart.slice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [items, setItems] = useState(1);
  const [goToId, setGoToId] = useState(false)
  const allProducts = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const productsFiltered = allProducts.filter(
    (product) => product.id !== Number(id)
  );

  useEffect(() => {
    dispatch(getProductsThunk())

    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}/`)
      .then((resp) => {
        console.log(resp.data);
        setProduct(resp.data);
        dispatch(filterCategoryThunk(resp.data.category.id));
      })
      .catch((error) => console.error(error));
  }, [goToId]);

  const decrement = () => {
    if (items > 1) {
      setItems(items - 1);
    }
  };

  const addToCart = () => {
    const cart = {
      quantity: items,
      productId: product.id,
    };
    dispatch(addItemCartThunk(cart));
  };

  return (
    <div>
      <Row>
        <p className="p-3">
          Home
          <i
            className="bx bxs-circle m-2"
            style={{ color: "#4361ee", fontSize: 5 }}
          ></i>
          {product.title}
        </p>
        <Col className="m-5">
          <Carousel variant="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={product?.images?.[0]?.url}
                alt="First slide"
                style={{ height: 200, objectFit: "contain" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={product?.images?.[1]?.url}
                alt="Second slide"
                style={{ height: 200, objectFit: "contain" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={product?.images?.[2]?.url}
                alt="Third slide"
                style={{ height: 200, objectFit: "contain" }}
              />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col>
          <div>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <Row>
              <Col>
                <p
                  style={{
                    fontSize: 12,
                    fontFamily: "Arial",
                    color: "rgba(0,0,0,.5)",
                    margin: 0,
                  }}
                >
                  Price
                </p>
                <p>$ {product.price}</p>
              </Col>
              <Col className="my-auto">
                <div className="products-items">
                  <Button size="sm" variant="dark" onClick={() => decrement()}>
                    -
                  </Button>
                  <span className="p-2">{items}</span>
                  <Button
                    size="sm"
                    variant="dark"
                    onClick={() => setItems(items + 1)}
                  >
                    +
                  </Button>
                </div>
              </Col>
            </Row>
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
            <Row xs={1} md={2} lg={3}>
              {productsFiltered.map((product) => (
                <Col className="mb-3" key={product.id}>
                  <Card
                    style={{ height: "100%", paddingTop: 2 }}
                    className="w-100"
                  >
                    <Card.Img
                      variant="top"
                      src={product.images[0].url}
                      style={{ height: 180, objectFit: "contain" }}
                    />
                    <Card.Body>
                      <Card.Title
                        className="card-title"
                        style={{ fontSize: 17 }}
                      >
                        {product.title}
                      </Card.Title>
                      <div className="price-button">
                        <div className="price">
                          <p
                            style={{
                              fontSize: 12,
                              fontFamily: "Arial",
                              color: "rgba(0,0,0,.5)",
                              margin: 0,
                            }}
                          >
                            Price
                          </p>
                          <Card.Text
                            className="card-title"
                            style={{ fontSize: 15 }}
                          >
                            $ {product.price}
                          </Card.Text>
                        </div>
                        <Button
                          as={Link}
                          to={`/products/${product.id}`}
                          variant="primary"
                          onClick={() => setGoToId(!goToId)}
                        >
                          more info
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
