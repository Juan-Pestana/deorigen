import React, {Component} from 'react'


import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

import userService from './../../../services/user.services'
import storeService from './../../../services/store.services'
import EachStore from './EachStore'




class AllStores extends Component {

    constructor() {
       super()
       this.state = {
           stores : [],
           storeNameSearch: "",
           ownerNameSearch: ""

       }
       this.userService = new userService()
       this.storeService = new storeService()
   }

   componentDidMount = () => {
    this.setAllStores()

}

    setAllStores = () => {
    this.storeService
            .getAllStores()
            .then(response => {
    
                this.setState({stores : response.data})})
            .catch(err => console.log('Error:', err))

    }



    handleInputChange = e => {
        let { name, value} = e.target
        this.setState({ [name]: value })
}

 



    deleteOneStore = id => {
        const update = [...this.state.stores]
        const index = update.findIndex(elem => elem.id === id)  //ojo y si tiene una tienda???
        update.splice(index-1, 1)

        this.storeService
            .deleteStore(id)
            .then(this.setState({stores : update}))
            .catch(err => console.log('Error:', err))

    }




   render(){
       console.log(this.props)

    return(
        <>
        <Container className='pt-3'>
        <Row className="justify-content-between">
                    <Col  className="searchBar">
                        <Form.Label>Nombre de la tienda</Form.Label>
                        <Form.Control className="input" type="text" name="storeNameSearch" value={this.state.storeNameSearch} onChange={this.handleInputChange} placeholder='Introduce el nombre de la tienda'/>
                    </Col>
                    <Col  className="searchBar">
                        <Form.Label>Nombre del propietario</Form.Label>
                        <Form.Control className="input" type="text" name="ownerNameSearch" value={this.state.ownerNameSearch} onChange={this.handleInputChange} placeholder='Introduce el nombre del propietario'/>
                    </Col>
                    
        </Row>
        
      {this.state.stores.filter(elm => elm.storeName.includes(this.state.storeNameSearch)) 
                        .filter(elm => elm.owner.firstName.includes(this.state.ownerNameSearch) || elm.owner.lastName.includes(this.state.ownerNameSearch))
                        .map(elem =><EachStore key={elem.id} {...elem} deleteStore={this.deleteOneStore} storeToEdit = {this.props.storeToEdit}/> )}


        </Container>
        
        </>
    )
   }

}


export default AllStores