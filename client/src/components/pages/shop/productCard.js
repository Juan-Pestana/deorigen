import React from 'react'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

import CartControl from './../../shared/cartControl/CartControl'

const ProductCard = ({productPicUrl, productName, format, price, _id}) => {
        
        return (
            <Col md={4} lg={3} >
                <Card className="product-card">
                    <Card.Img variant="top" src={productPicUrl} />
                    <Card.Body>
                        <h6>{productName}</h6>
                        <p className="format">{format} <br></br>
                        <span className="price">{price} €</span> /ud.</p>
                        <hr></hr>
                        <CartControl productId={_id} />
                    </Card.Body>
                </Card>
            </Col>

        )
    }


export default ProductCard
