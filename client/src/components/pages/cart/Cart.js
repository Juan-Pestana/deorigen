import React, {Component} from 'react'
import { Link } from 'react-router-dom'

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
            console.log(subtotalArr, typeof(subtotalArr[0]))
            const subtotal = subtotalArr.reduce(function(a, b){ return parseFloat(a) + parseFloat(b) })
            console.log(subtotal)
            this.setState({subtotal})
        
    }


    render(){
        console.log('busca las props de router', this.props)
        console.log(this.state)
        return(
            <Container onClick={this.loadProductsFromLocalStorage}> 
                        {this.state.productList.map(elm => <CartCard key = {elm.product._id} {...elm.product} />)}
                        {this.state.productList.length === 0 && 
                                <Row className={"justify-content-center"} style={{ padding : "20px"}}>
                                    <h4>Tu carrito está vacío</h4>
                                </Row>
                        }
                        <hr></hr>
                        <Row className={"justify-content-center"} style={{ padding : "20px"}}>
                            <h4>Total aproximado: {this.state.subtotal}</h4>
                        </Row>
                        {this.state.productList.length === 0 && 
                                <Row style={{ padding: "25px"}}>
                                    <Button to="/shop" style={{ padding: "10px"}}className="btn btn-secondary btn-block" onClick={() => this.props.closeModal(false,"/shop")}> Ir a la Tienda </Button> 
                                </Row>
                        }
                        {this.state.productList.length > 0 && 
                                <Row style={{ padding: "25px"}}>
                                    <Button to="/order" style={{ padding: "10px"}}className="btn btn-secondary btn-block" onClick={() => this.props.closeModal(false,"/order")}> Tramitar Pedido </Button> 
                                </Row>
                        }


            </Container>
        )
    }
}

export default Cart