import React, {Component} from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import productService from './../../../services/product.services'

class Shop extends Component {
    constructor() {
        super()
        this.state ={
            products : [],

        }
        this.productService = new productService
    }

    componentDidMount = () => this.loadProducts()

    loadProducts =() => {
        this.productService
            .getAllProducts()
            .then(response => this.setState({products: response.data}))
            .catch(err => console.log('Error:', err))

    }

    render(){

        return(
            <>
            <ul>
                {this.state.products.map(elm => <li key = {elm._id}>{elm.productName}</li>)}
            </ul>
            </>
        )
    }


}

export default Shop