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
            search : "",
            category: ''

        }
        this.productService = new productService()
    }

    componentDidMount = () => this.loadProducts()

    loadProducts =() => {
  
        this.productService
            .getAllProducts()
            .then(response => this.setState({products: response.data}))
            .catch(err => console.log('Error:', err))

    }

    setCategory = (category) => {
            this.setState({category})
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
                <div className='d-flex justify-content-around'>
                    <div className='btn btn-outline-primary btn-sm' name='meat' onClick= { () => this.setCategory('meat')}>Carne</div>
                    <div className='btn btn-outline-primary btn-sm' name='fish' onClick={ () => this.setCategory('fish')}>Pescado</div>
                    <div className='btn btn-outline-primary btn-sm' name='veggies' onClick={ () =>this.setCategory('veggies')}>Verduras</div>
                    <div className='btn btn-outline-primary btn-sm' name='wine' onClick={ () => this.setCategory('wine')}>Vino</div>
                    <div className='btn btn-outline-primary btn-sm' name='dairy' onClick={ () => this.setCategory('dairy')}>Lacteos</div>
                    <div className='btn btn-outline-primary btn-sm' name='dairy' onClick={ () => this.setCategory('')}>borrar filtros</div>
                </div>
                <Row>
                    <CardDeck>
                        {(this.state.category ? this.state.products.filter(elm => elm.category === this.state.category)  : this.state.products)
                            .filter(elm => elm.productName.includes(this.state.search))
                            .map(elm => <ProductCard key = {elm._id} {...elm} />)}
                    </CardDeck>
                </Row>
            </Container>
        )
    }


}

export default Shop