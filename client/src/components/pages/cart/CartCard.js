import React from 'react'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import CartControl from '../../shared/cartControl/CartControl'

const CartCard = ({_id, productPicUrl, productName, format, price }) => {
    
    return (
        <Col xs={12} >
            <Row className="product-card">
                <Col xs={4} className="px-0 px-md-3">
                    <img className="cart-image" src={productPicUrl} alt={productName} />
                </Col>
                <Col xs={8}>
                    <h6>{productName}</h6>
                    <p className="format">{format} <br></br>
                    <span className="price">{price} €</span> /ud.</p>
                    <hr></hr>
                    <CartControl productId={_id} />
                </Col>
                
            </Row>
        </Col>

    )
}

export default CartCard
