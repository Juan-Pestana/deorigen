import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import CartCard from './CartCard'

import productService from '../../../services/product.services'

import './cart.css'

class Cart extends Component {
    constructor() {
        super()
        this.state ={
            productList : [],
            subtotal : "",
            isClosing: ''

        }
        this.productService = new productService()
    }

    componentDidMount = () => {
        this.loadProductsFromLocalStorage()
        this.checkCloseOrder()
    }

    checkCloseOrder = () => {
        this.props.closing && this.setState({isClosing : true})
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
        const subtotal = subtotalArr.reduce(function(a, b){ return parseFloat(a) + parseFloat(b) }, 0)
        this.setState({subtotal})
        
            
    }



    render(){
       
        return(
            <Container onClick={this.loadProductsFromLocalStorage} className="px-0 px-md-3"> 
                    
                {this.state.productList.map(elm => <CartCard key = {elm.product._id} {...elm.product} />)}
                {this.state.productList.length === 0 && 
                    <Row className={"justify-content-center"} style={{ padding : "20px"}}>
                        <h4>Tu carrito está vacío</h4>
                    </Row>
                }
                <hr></hr>
                <Row className={"justify-content-center"} style={{ padding : "20px"}}>
                    <h4>Total aproximado: {this.state.subtotal} €</h4>
                </Row>
                {(this.state.productList.length === 0) && 
                    <Row style={{ padding: "25px"}}>
                    {this.props.closeModal
                        ?
                        <Button style={{ padding: "10px" }} className="btn btn-secondary btn-block" onClick={() => this.props.closeModal(false, "/shop")}> Ir a la Tienda </Button>
                        :
                        <Link to="/shop" style={{ padding: "10px" }} className="btn btn-secondary btn-block">Volver a la Tienda</Link>}
                    </Row>
                }
                {(!this.state.isClosing && this.state.productList.length > 0 )&& 
                    <Row style={{ padding: "25px"}}>
                        <Button to="/order" style={{ padding: "10px"}}className="btn btn-secondary btn-block" onClick={() => this.props.closeModal(false,"/order")}> Tramitar Pedido </Button> 
                    </Row>
            }

                {(this.state.isClosing && this.state.productList.length > 0 )&& 
                    <Row style={{ padding: "25px"}}>
                        <Button to="/order" style={{ padding: "10px"}}className="btn btn-secondary btn-block" 
                                onClick={() => this.props.setShow('PersonalInfo')}> Confirmar Productos </Button> 
                    </Row>
                }


            </Container>
        )
    }
}

export default Cart

