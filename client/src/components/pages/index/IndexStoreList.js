import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import storeService from '../../../services/store.services'

import StoreCard from './../storeList/StoreCard'

class IndexStoreList extends Component {

     constructor() {
        super()
        this.state = {
            stores: [],
        }
        this.storeService = new storeService()
    }

    componentDidMount = () => this.loadStores()

    loadStores =() => {
  
        this.storeService
            .getLast3Stores()
            .then(response => this.setState({stores: response.data}))
            .catch(err => console.log('Error:', err))

    }

    handleInputChange = e => {
        let { name, value} = e.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <>
                <h3 className="mt-4">Descubre a Nuestros Productores</h3>
                {this.state.stores.map(elm => <StoreCard key = {elm._id} {...elm} storeLink={'storelist'}/>)}
                <Link to="storelist" ><h3>...Y muchos más</h3></Link>
            </>    

        )
    }
}

export default IndexStoreList