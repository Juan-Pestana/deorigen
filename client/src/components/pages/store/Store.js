import React, { Component } from 'react'


import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import storeService from './../../../services/store.services'
import productService from './../../../services/product.services'
import MapContainer from './../../shared/MapContainer'
import MiniShopCard from './MiniShopCard'

import './store.css'

class Store extends Component {

     constructor() {
        super()
        this.state = {
            showMinishopModal: false,
            store: {},
        }
         this.storeService = new storeService()
         this.productService = new productService()
    }

    componentDidMount = () => this.loadStoreFromDb()
    
    loadStoreFromDb = () => {
        this.storeService
            .getOneStore(this.props.match.params.storeId)
            .then(response => this.setState({ store: response.data }))
            .catch(err => console.log('Error:', err))
    }

 
    handleMinishopModal = showMinishopModal => this.setState({ showMinishopModal })


    render() {
        return (
            <>
                <Container className="page d-flex flex-column justify-content-center">
                    <Jumbotron className="p-0 mb-0">
                        <img src={this.state.store.heroPicUrl} alt={this.state.store.storeName} style={{width:"100%", objectFit:"cover", objectPosition:"center", height:300}}/>
                    </Jumbotron>
                    <h1 className="text-center mb-4" style={{fontFamily:"'open sans', 'sans-serif'"}}>{this.state.store.storeName}</h1>
                    <Row className="d-flex justify-content-center mb-4" style={{minHeight:400}}>
                        <Col lg={6} className="text-right">
                            <img src={this.state.store.contentPicUrl} alt={this.state.store.tagline} style={{maxHeight:400, maxWidth:'100%', objectFit:'contain'}}/>
                        </Col>

                        <Col lg={6} className="text-center" style={{padding:"10% 15% 10% 1%"}}>
                            <h2>{this.state.store.tagline}</h2>
                        </Col>
                    </Row>

                    <Row className="d-flex justify-content-center mb-4" style={{minHeight:400}}>
                        <Col lg={6} className="text-left text-md-right">
                            <section className="pl-5 pt-3">
                                <p>{this.state.store.description}</p> 
                            
                                <p><em>{this.state.store.address}</em></p>

                            </section> 
                        </Col>

                        <Col lg={5} className="text-center mx-3 px-0" style={{minHeight:400}}>
                            {this.state.store.location && <MapContainer location={this.state.store.location.coordinates}
                                storeName={this.state.store.storeName} style={{ height: "100%", width: "100%" }} />}
                        </Col>
                    </Row>
                    <h3 className="text-center">Los Productos de {this.state.store.storeName}</h3>    
                    <Row className= 'mb-4'>
                        <Col className="d-flex justify-content-center miniShopBanner flex-wrap" onClick={() => this.handleMinishopModal(true)}>
                            {this.state.store.products && this.state.store.products.map(elm => <img src={elm.productPicUrl} alt={elm.productName} />)}

                        </Col>
                    </Row>
                                
                </Container>

                <Modal show={this.state.showMinishopModal} onHide={() => this.handleMinishopModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>De {this.state.store.storeName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="container">
                        <Row className="d-flex">
                        {this.state.store.products && this.state.store.products.map(elm => <MiniShopCard key={elm._id} {...elm}/>)}
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <ButtonGroup className="text-center" style={{width: "70%"}}>
                                <Button variant="outline-secondary" onClick={() => this.handleMinishopModal(false)}>Volver</Button>
                                <Button variant="secondary" onClick={() => this.props.history.push('/shop')}> Ir a la Tienda </Button>
                            </ButtonGroup>
                        </Row>
                    </Modal.Body>
                </Modal>
            </>

        )
    }
}

export default Store