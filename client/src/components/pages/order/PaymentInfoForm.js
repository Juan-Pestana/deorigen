import React, { Component } from 'react'


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
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
                },
            isClosed: false
            
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
                            if (elm1._id === elm2.product){
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

    handleFormSubmit = e => {
        e.preventDefault()

        this.orderService
            .checkPayment({paymentInfo: this.state.payment, amount: this.state.total})
            .then(reponse => this.setState({ isClosed: true}, () => this.recordNewOrder()))
            .catch(err => console.log('Error:', err))

    }

    recordNewOrder = () => {

        this.orderService
            .newOrder(this.state)
            .then(response =>{
                const orderId = response.data.orderHistory[0]
                console.log(orderId)
                localStorage.setItem('deOrigenCart', JSON.stringify([]))
                this.props.history.push(`order/thankyou/${orderId}`)
            })
            .catch(err => console.log('Error:', err))
                //this.props.history.push(`order/thankyou/${response.data._id}`))

    }
    
    render() {

        return (
            <Container>
                <Row>
                    <h1 className="col-lg-3">Tu Información de Pago</h1>
                
                    <div className="col-lg-9 px-0 px-md-3 pb-5">
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
                                        <Form.Control type="text" name="cardName" value={this.state.payment.cardName} onChange={this.handleCardChange} placeholder="Tu Nombre"/>
                                    </Form.Group>
                                    <Row>
                                        <Form.Group className={"col-12 col-lg-7"}>
                                            <Form.Label>Nº de tarjeta</Form.Label>
                                            <Form.Control type="number" name="cardNumber" value={this.state.payment.cardNumber} onChange={this.handleCardChange} />
                                        </Form.Group>

                                        <Form.Group className={"col-8 col-lg-3"}>
                                            <Form.Label>Caduca en</Form.Label>
                                            <Form.Control type="text" name="expiry" value={this.state.payment.expiry} onChange={this.handleCardChange} />
                                        </Form.Group>

                                        <Form.Group className={"col-4 col-lg-2"}>
                                            <Form.Label>CVC</Form.Label>
                                            <Form.Control type="number" name="cvc" value={this.state.payment.cvc} onChange={this.handleCardChange} />
                                        </Form.Group>
                                        
                                    </Row>

                                    <Row style={{ padding: "25px"}}>
                                        <Button style={{ padding: "10px"}}className="btn btn-secondary btn-block" type="submit"> Proceder al pago </Button> 
                                    </Row>

                                </Form>
                            </Card.Body>
                        </Card>
                    </div>  
                </Row>
            </Container>   
        )
    }
}

export default PaymentInfoForm

