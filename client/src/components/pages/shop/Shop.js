import React, {Component} from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
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
            <Container >
                
                <h1>Tienda</h1>
                <Row className="justify-content-center">
                    <Col lg={5} className="searchBar">
                        <Form.Control className="input" type="text" name="search" value={this.state.search} onChange={this.handleInputChange} placeholder='Introduce el nombre del producto'/>
                    </Col>
                    <Col lg={7} className="filters">
                    <ButtonGroup className="d-none d-md-block" >
                        <Button variant="outline-dark" name='meat' onClick= { () => this.setCategory('meat')}>Carne</Button>
                        <Button variant="outline-dark" name='fish' onClick={ () => this.setCategory('fish')}>Pescado</Button>
                        <Button variant="outline-dark" name='veggies' onClick={ () =>this.setCategory('veggies')}>Verduras</Button>
                        <Button variant="outline-dark" name='wine' onClick={ () => this.setCategory('wine')}>Vino</Button>
                        <Button variant="outline-dark" name='dairy' onClick={ () => this.setCategory('dairy')}>Lacteos</Button>
                        <Button variant="outline-primary" name='clear' onClick={ () => this.setCategory('')}>Limpiar</Button>
                    </ButtonGroup>
                    <div className="d-flex flex-wrap justify-content-between d-md-none smallPhone" >
                        <Button variant="outline-dark" name='meat' onClick= { () => this.setCategory('meat')}>Carne</Button>
                        <Button variant="outline-dark" name='fish' onClick={ () => this.setCategory('fish')}>Pescado</Button>
                        <Button variant="outline-dark" name='veggies' onClick={ () =>this.setCategory('veggies')}>Verduras</Button>
                        <Button variant="outline-dark" name='wine' onClick={ () => this.setCategory('wine')}>Vino</Button>
                        <Button variant="outline-dark" name='dairy' onClick={ () => this.setCategory('dairy')}>Lacteos</Button>
                        <Button variant="outline-primary" name='clear' onClick={ () => this.setCategory('')}>Limpiar</Button>
                    </div>
                    </Col>
                </Row>
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