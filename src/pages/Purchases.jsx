import { useState, useEffect } from "react";
import axios from "axios";
import getConfig from "../uitls/getConfig";
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch } from "react-redux";
import { setIsLoading } from "../store/slices/isLoading.slice";


const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(setIsLoading(true))
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", getConfig())
      .then((resp) => setPurchases(resp.data))
      .catch((error) => console.error(error))
      .finally(dispatch(setIsLoading(false)))
  }, []);

  console.log(purchases);

  return (
    <div>
      <h1>Thi is the purchases component</h1>
      <ListGroup variant="flush">
        {
            purchases.map(purchase => (
                <ListGroup.Item key={purchase.id}>
                    <img style={{width:200}} src={purchase.product.images[0].url} alt="product image" />
                    <h5>{purchase.product.title}</h5>
                </ListGroup.Item>
            ))
        }
      
      
    </ListGroup>
    </div>
  );
};

export default Purchases;
