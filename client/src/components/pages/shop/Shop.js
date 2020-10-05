import React, {Component} from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import CardDeck from 'react-bootstrap/CardDeck'

import ProductCard from './productCard'

import productService from './../../../services/product.services'

import './shop.css'

class Shop extends Component {
    constructor() {
        super()
        this.state ={
            products : [],
            search : ""

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

    handleInputChange = e => {
        let { name, value} = e.target
        this.setState({ [name]: value })
    }

    render(){

        return(
            <Container>
                <div className="control">
                    <input className="input" type="text" name="search" value={this.state.search} onChange={this.handleInputChange} placeholder='busque sus productos'/>
                </div>
                <Row>
                    <CardDeck>
                        {this.state.products.filter(elm => elm.productName.includes(this.state.search)).map(elm => <ProductCard key = {elm._id} {...elm} />)}
                    </CardDeck>
                </Row>
            </Container>
        )
    }


}

export default Shop