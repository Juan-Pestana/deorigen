import React, {Component} from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import CardDeck from 'react-bootstrap/CardDeck'

import CartCard from './CartCard'

import productService from '../../../services/product.services'

import './cart.css'

class Cart extends Component {
    constructor() {
        super()
        this.state ={
            productList : [],
            subtotal : "",
            category: ''

        }
        this.productService = new productService()
    }

    componentDidMount = () => this.loadProductsFromLocalStorage()

    // componentDidUpdate = () => {
    //     let cartLocalStorage = JSON.parse(localStorage.getItem('deOrigenCart'))
    //     if (cartLocalStorage.length != this.state.productList.length) {
    //         console.log('Entra')
    //         this.loadProductsFromLocalStorage()
    //     }
    // }

    loadProductsFromLocalStorage = () =>{
        let cartLocalStorage = JSON.parse(localStorage.getItem('deOrigenCart'))
        
        this.productService
            .getProductsFromCart( cartLocalStorage.map(elm => elm.product))
            .then(response => {
                let productList= []
                response.data.forEach(elm1 =>{
                    cartLocalStorage.forEach(elm2 => {
                        if (elm1._id == elm2.product){
                        productList.push({product : elm1, quantity: elm2.quantity})
                        }
                    })
                })
                
                this.setState({productList},() => this.updateSubtotal()) 
            })
            .catch(err => console.log('Error:', err))

    }

    updateSubtotal = () => {
        const subtotalArr = this.state.productList.map (elm => elm.product.price * elm.quantity)
        subtotalArr.reduce(function(a, b){ return a + b })
        this.setState({subtotal : subtotalArr})
    }


    render(){
        console.log(this.state)
        return(
            <Container onClick={this.loadProductsFromLocalStorage}> 
                        <h4>Total aproximado: {this.state.subtotal}</h4>
                        {this.state.productList.map(elm => <CartCard key = {elm.product._id} {...elm.product} />)}
            </Container>
        )
    }
}

export default Cart