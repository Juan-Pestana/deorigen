import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import iconPlus from './cart_plus.png'
import iconMinus from './cart_minus.png'
import trash from './cart_delete.png'

import './cartControl.css'

class ProductCard extends Component {

     constructor() {
        super()
        this.state = {
            product_id:"",
            quantity : 0

        }
    }

    handleQuantity = (num) => this.setState({
        quantity: this.state.quantity + num
        
        
    })

    // modifyLocalStorageCart = (productId, num) => {
    //     let cartLocalStorage = localStorage.getItem('deOrigenCart')

    // }

    removeFromCart = () => this.setState({
        quantity: 0
    })

    render() {
        return (
            <div className="cartControl d-flex justify-content-between">
                <p>
                    <span className="quantity-label">En carro</span><br></br>
                    <span className="quantity">{this.state.quantity}</span>
                </p>
                <div className="cart-icons">
                   {this.state.quantity > 1 && <img src={iconMinus} alt='quitar unidad del carrito' onClick={() => this.handleQuantity(-1)}/>}
                   {this.state.quantity === 1 &&  <img src={trash} alt='eliminar del carrito' onClick={() => this.removeFromCart()}/>}
                    <img src={iconPlus} alt='añadir unidad al carrito' onClick={() => this.handleQuantity(1)}/>

                    

                </div>
            </div>
        )
    }
}

export default ProductCard