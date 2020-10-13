import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
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
            <Container className="page">
            <h1 className="text-center">Gracias por comprar De Origen</h1>
            <p className="ml-5 mt-5"> Tu número de pedido es el <span style={{fontWeight:700}}>{this.props.match.params.orderId.slice(-6)}</span></p>
            <p className="ml-5"> Ahora puedes:</p>
            <ul className="ml-5">
                <li>Hacer un seguimiento de tu pedido <Link to="/">aquí</Link></li>
                <li>Seguir comprando <Link to="/shop">aquí</Link></li>
                <li>Descubrir más sobre nuestros productores <Link to="/storeList">aquí</Link></li>


            </ul>
            </Container>
        )
    }
}

export default ProductCard
