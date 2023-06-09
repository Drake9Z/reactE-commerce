import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {useForm} from "react-hook-form"
import { setIsLoading } from '../store/slices/isLoading.slice';
import { useDispatch} from "react-redux"

const Login = () => {

    const {register, handleSubmit} = useForm(); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const submit = (data) => {

        dispatch(setIsLoading(true))
        
        axios   
            .post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login", data)
            .then(resp => {
                console.log(resp)
               //localStorage.setItem("nombrePropiedad", valorAsignafoALaPropiedadJSON)
               localStorage.setItem("token", resp.data.token)
               navigate("/")
            })
            .catch(error => {
                
                if(error.response.status === 401){
                    alert("credenciales incorrectas")
                }
                console.error(error)
            })
            .finally(() => dispatch(setIsLoading(false)))
    }

  return (
    <Card style={{ width: '18rem'}} className="mx-auto my-auto">
      <Form onSubmit={ handleSubmit(submit)}  className="p-3" style={{border: "1px solid black"}}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Col sm={10}>
          <Form.Label >
            Email
          </Form.Label>
            <Form.Control 
            type="email" 
            placeholder="Email"
            { ...register("email")}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Col sm={10}>
          <Form.Label>
            Password
          </Form.Label>
            <Form.Control 
            type="password" 
            placeholder="Password" 
            { ...register("password")}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Sign in</Button>
          </Col>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default Login;
