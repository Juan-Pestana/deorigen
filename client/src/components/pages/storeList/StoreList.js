import React, {Component} from 'react'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'

import storeService from './../../../services/store.services'

import StoreCard from './StoreCard'

class StoreList extends Component {

     constructor() {
        super()
        this.state = {
            stores: [],
            search : "",
        }
        this.storeService = new storeService()
    }

    componentDidMount = () => this.loadStores()

    loadStores =() => {
  
        this.storeService
            .getAllStores()
            .then(response => this.setState({stores: response.data}))
            .catch(err => console.log('Error:', err))

    }

    handleInputChange = e => {
        let { name, value} = e.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <Container className="px-1 px-md-3 px-lg-5 page ">
                <h1>Nuestros Productores</h1>
                <Row className="justify-content-between mr-0">
                    <Col  className="searchBar">
                        <Form.Control className="input" type="text" name="search" value={this.state.search} onChange={this.handleInputChange} placeholder='Introduce el nombre del productor'/>
                    </Col>
                </Row>
                
                {this.state.stores.filter(elm => elm.storeName.toLowerCase().includes(this.state.search.toLowerCase()))
                            .map(elm => <StoreCard key = {elm._id} {...elm} />)}
                


            </Container>    

        )
    }
}

export default StoreList