import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import CartControl from './../../shared/cartControl/CartControl'

class ProductCard extends Component {

     constructor() {
        super()
        this.state = {
            quantity : 0

        }
    }

    render() {
        
        return (
            <Col md={4} lg={3} >
                <Card className="product-card">
                    <Card.Img variant="top" src={this.props.productPicUrl} />
                    <Card.Body>
                        <h6>{this.props.productName}</h6>
                        <p className="format">{this.props.format} <br></br>
                        <span className="price">{this.props.price} €</span> /ud.</p>
                        <hr></hr>
                        <CartControl productId={this.props._id} />
                    </Card.Body>
                </Card>
            </Col>

        )
    }
}

export default ProductCard
