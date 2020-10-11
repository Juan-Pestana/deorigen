import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import CartControl from '../../shared/cartControl/CartControl'

class CartCard extends Component {

     constructor() {
        super()
        this.state = {
            quantity : 0

        }
    }

    render() {
        console.log(this.props)
        return (
            <Col xs={12} >
                <Row className="product-card">
                    <Col xs={4} className="px-0 px-md-3">
                        <img className="cart-image" src={this.props.productPicUrl} />
                    </Col>
                    <Col xs={8}>
                        <h6>{this.props.productName}</h6>
                        <p className="format">{this.props.format} <br></br>
                        <span className="price">{this.props.price} €</span> /ud.</p>
                        <hr></hr>
                        <CartControl productId={this.props._id} />
                    </Col>
                    
                </Row>
            </Col>

        )
    }
}

export default CartCard
