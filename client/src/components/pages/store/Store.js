import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'

import storeService from './../../../services/store.services'

class Store extends Component {

     constructor() {
        super()
        this.state = {
            showMinishopModal: false
        }
        this.storeService = new storeService()
    }

    componentDidMount = () => {
        this.storeService
            .getOneStore(this.props.match.params.storeId)
            .then(response => this.setState(response.data))
            .catch(err => console.log('Error:', err))
    }

    render() {
        return (
            <Container className="page d-flex flex-column justify-content-center">
                <Jumbotron className="p-0 mb-0">
                    <img src={this.state.heroPicUrl} alt={this.state.storeName} style={{width:"100%", objectFit:"cover", objectPosition:"center", height:300}}/>
                </Jumbotron>
                <h1 className="text-center mb-4" style={{fontFamily:"'open sans', 'sans-serif'"}}>{this.state.storeName}</h1>
                <Row className="d-flex justify-content-center mb-4">
                    <Col lg={6} className="text-right">
                        <img src={this.state.contentPicUrl} alt={this.state.tagline} />
                    </Col>

                    <Col lg={6} className="text-center" style={{padding:"10% 15% 10% 1%"}}>
                        <h2>{this.state.tagline}</h2>
                    </Col>
                </Row>

                 <Row className="d-flex justify-content-center mb-4">
                    <Col lg={6} className="text-right">
                        <section className="pl-5 pt-3">
                            <p>{this.state.description}</p> 
                           
                            <p><em>{this.state.address}</em></p>

                        </section> 
                    </Col>

                    <Col lg={6} className="text-center" style={{padding:"10% 15% 10% 1%"}}>
                        <h2>{this.state.tagline}</h2>
                    </Col>
                </Row>


                
                
                <main>

                </main>
            
            </Container>

        )
    }
}

export default Store