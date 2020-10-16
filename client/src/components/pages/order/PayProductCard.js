import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'


export default class PayProductCard  extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            showProductListModal : false
        }
    }    

    handleProductListModal = showProductListModal => this.setState({ showProductListModal })

    render() {

        return (
            <>
            <Card>
                <Card.Header>Tu Pedido</Card.Header>
                <Card.Body>
                    <p>Importe Productos {this.props.subtotal} €. <span onClick={() => this.handleProductListModal(true)} className="link-modal">
                        Ver detalle productos</span></p>
                    <p>Gastos de Envío {this.props.shipping} €. </p>
                    <p>Total {this.props.total} €.</p>
                </Card.Body>
            </Card>   
        
            <Modal show={this.state.showProductListModal} onHide={() => this.handleProductListModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Tu Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.productList.map(elm =><p key={elm._id}>{elm.quantity} x {elm.product.productName}. {elm.product.format}</p>)}
                </Modal.Body>
            </Modal>
            </>
        ) 
    }
}

