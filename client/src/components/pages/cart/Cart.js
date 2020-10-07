import React, {Component} from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import CardDeck from 'react-bootstrap/CardDeck'

import ProductCard from './productCard'

import productService from '../../../services/product.services'

import './shop.css'

class Cart extends Component {
    constructor() {
        super()
        this.state ={
            productList : [],
            total : "",
            category: ''

        }
        this.productService = new productService()
    }

    componentDidMount = () => this.loadProductsFromLocalStorage()

    loadProductsFromLocalStorage = () =>{
        let cartLocalStorage = JSON.parse(localStorage.getItem('deOrigenCart'))

        this.productService
            .getProductsFromCart( cartLocalStorage.map(elm => elm.product))
            .then(response => this.setState({productList : response.data}))
            .catch(err => console.log('Error:', err))


    }

    render(){

        return(
            <Container>
               
                <Row>
                    <CardDeck>
                        {this.state.productList.map(elm => <ProductCard key = {elm._id} {...elm} />)}
                    </CardDeck>
                </Row>
            </Container>
        )
    }
}

export default Cart