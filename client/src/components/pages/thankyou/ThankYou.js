import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import CartControl from '../../shared/cartControl/CartControl'

class ProductCard extends Component {

     constructor() {
        super()
        this.state = {
            quantity : 0

        }
    }

    render() {
        
        return (
 
 <h1>Gracias por comprar</h1>

        )
    }
}

export default ProductCard
