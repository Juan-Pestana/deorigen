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
            quantity : 0
        }
    }

    componentDidMount = () => this.initializeProductQuantity(this.props.productId)
    
    initializeProductQuantity = (productId) => {
        let cartLocalStorage = JSON.parse(localStorage.getItem('deOrigenCart'))

        cartLocalStorage.forEach(elm => {
            if (elm.product === productId) {
                this.setState({quantity : elm.quantity})
            }
        })
    }

    handleQuantity = (num) => {
        this.setState({quantity : this.state.quantity + num})
        this.modifyLocalStorageCart(this.props.productId, this.state.quantity + num)    
    }

    removeFromCart = () => {
        this.setState({ quantity: 0 })
        this.removeFromLocalStorageCart(this.props.productId)
    }

    modifyLocalStorageCart = (productId, quantity) => {
        let cartLocalStorage = JSON.parse(localStorage.getItem('deOrigenCart'))
        let itemExists = false

        console.log(cartLocalStorage)
        
        cartLocalStorage.forEach(elm => {
                if (elm.product === productId) {
                    elm.quantity = quantity
                    itemExists = true
                }
            })

        !itemExists && cartLocalStorage.push({product: productId, quantity})
        localStorage.setItem('deOrigenCart', JSON.stringify(cartLocalStorage))
    }

    removeFromLocalStorageCart = (productId) =>{
        let cartLocalStorage = JSON.parse(localStorage.getItem('deOrigenCart'))
        let itemIndex 

        cartLocalStorage.forEach((elm, index) => {
            if (elm.product === productId) {
                itemIndex = index
            }
        })

        cartLocalStorage.splice(itemIndex, 1)
        localStorage.setItem('deOrigenCart', JSON.stringify(cartLocalStorage))
    }



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