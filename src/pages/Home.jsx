import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getProductsThunk,
  filterCategoryThunk,
  filterByNameThunk,
} from "../store/slices/products.slice";

const Home = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
      .then((resp) => setCategories(resp.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Row className="pt-5">
        <Col md={4} lg={3}>
          <Accordion defaultActiveKey="0" >
            <Accordion.Item eventKey="1">
              <Accordion.Header style={{border: "none"}}>Category</Accordion.Header>
              <Accordion.Body>
                <ListGroup className="w-100">
                {categories.map((category) => (
                  <ListGroup.Item
                    key={category.id}
                    onClick={() => dispatch(filterCategoryThunk(category.id))}
                    className='m-2'
                    style={{cursor: "pointer"}}
                  >
                    {category.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              </Accordion.Body>
              
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col md={8} lg={9}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="What are you loking for? "
              aria-label="What are you loking for? "
              aria-describedby="basic-addon2"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => dispatch(filterByNameThunk(searchValue))}
              style={{ backgroundColor: "#4361ee", color: "white" }}
            >
              Buscar
            </Button>
          </InputGroup>
          <Row xs={1} md={2} lg={3}>
            {productsList.map((product) => (
              <Col className="mb-3" key={product.id}>
                <Card 
                style={{height: '100%', paddingTop: 2}}
                className="w-100" 
                >
                  <Card.Img variant="top" 
                  src={product.images[0].url}
                  style={{height: 180, objectFit: "contain"}}
                  />
                  <Card.Body>
                    <Card.Title className="card-title" style={{ fontSize: 17 }}>
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
                      <Card.Text className="card-title" style={{ fontSize: 15 }}>
                        $ {product.price}
                      </Card.Text>
                      </div>
                      <Button
                        as={Link}
                        to={`/products/${product.id}`}
                        variant="primary"
                      >
                        more info
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
