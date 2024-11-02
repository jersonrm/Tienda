import React from 'react'
import { useEffect, useState} from 'react'
import { useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
//import products from '../products'
import axios from 'axios'

const ProductScreen = () => {
  const [product, setProduct] = useState([]);

  const { id: productId } = useParams()
  //const product = products.find(p => p._id === productId)
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
      setProduct(data);
    }
    fetchProduct();
  }, [productId]);

  return <>
    <Link className='btn btn-light my-3' to='/'>
    Volver
    </Link>
    <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                    Precio: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    Descripción: {product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Precio:
                            </Col>
                            <Col>
                                <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Estado:
                            </Col>
                            <Col>
                                {product.countInStock > 0 ? 'En Stock' : 'Sin Stock'}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                            Añadir al Carrito
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
  </>
}

export default ProductScreen