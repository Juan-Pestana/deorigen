import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/esm/Card'

import authService from '../../../services/auth.service'
import userService from '../../../services/user.services'
import productService from '../../../services/product.services'
import orderService from '../../../services/order.services'

import PayPersonalCard from './PayPersonalCard'
import PayProductCard from './PayProductCard'

class PaymentInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productList: [],
            subtotal: 0,
            shipping: 0,
            total: 0,
            
            payment: {
                cardName: '',
                cardNumber: '',
                expiry: '',
                cvc: ''
                }
            
        }
        this.userService = new userService()
        this.productService = new productService()
        this.orderService = new orderService()
        this.authService = new authService()
    }

    componentDidMount = () => {
        this.fetchUser() 
        this.loadProductsFromLocalStorage()
    }
    
    //Initialize State

    fetchUser = () => {
        this.authService
            .isLoggedIn()
            .then(response => this.setState({ loggedInUser: response.data }))
            .catch(err => {
                this.setState({ loggedInUser: null })

            })
        }

    loadProductsFromLocalStorage = () =>{
        let cartLocalStorage = JSON.parse(localStorage.getItem('deOrigenCart'))
        
        if (cartLocalStorage.length >0) {
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
        else{
            this.setState({productList:[], subtotal: 0})
        }
    }

    updateSubtotal = () => {
        const subtotalArr = this.state.productList.map (elm => elm.product.price * elm.quantity)
        const subtotal = subtotalArr.reduce(function(a, b){ return parseFloat(a) + parseFloat(b) })
        this.setState({subtotal},() => this.updateTotal())     
    }   

    updateTotal = () => {
        this.orderService
            .getShippingExpenses()
            .then(response => this.setState({shipping: response.data.shipping },
                () => this.setState({total : this.state.subtotal + this.state.shipping}) ))
            .catch(err => console.log('Error:', err))
    }

    //Payment Process

    handleCardChange = e => {
        const { name, value } = e.target
        this.setState({payment:{...this.state.payment ,[name]: value } })
    }
    
    render() {

        return (
            <Container>
                {this.state.loggedInUser && <PayPersonalCard {...this.state.loggedInUser} />}
                <hr></hr>

                {this.state.productList && <PayProductCard {...this.state} />}
                <hr></hr>
            <Card>
                <Card.Header>Pago</Card.Header>
                <Card.Body>
            <Form onSubmit={this.handleFormSubmit} >
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="cardName" value={this.state.cardName} onChange={this.handleInputChange} placeholder="Tu Nombre"/>
                </Form.Group>
                <Row>
                    <Form.Group className={"col-12 col-lg-7"}>
                        <Form.Label>Nº de tarjeta</Form.Label>
                        <Form.Control type="number" name="cardNumber" value={this.state.lastName} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group className={"col-8 col-lg-3"}>
                        <Form.Label>Caduca en</Form.Label>
                        <Form.Control type="text" name="expiry" value={this.state.lastName} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group className={"col-4 col-lg-2"}>
                        <Form.Label>CVC</Form.Label>
                        <Form.Control type="number" name="cvc" value={this.state.address} onChange={this.handleInputChange} />
                    </Form.Group>
                </Row>

                <Row style={{ padding: "25px"}}>
                    <Button style={{ padding: "10px"}}className="btn btn-secondary btn-block" type="submit"> Proceder al pago </Button> 
                </Row>

            </Form>
            </Card.Body>
            </Card>

            </Container>
        )
    }
}

export default PaymentInfoForm