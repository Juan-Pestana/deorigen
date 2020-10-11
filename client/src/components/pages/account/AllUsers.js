import React, {Component} from 'react'


import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import userService from './../../../services/user.services'
import storeService from './../../../services/store.services'
import EachUser from './EachUser'




class AllUsers extends Component {

    constructor() {
       super()
       this.state = {
           users : [],
           filterRole: "",
           search: ""

       }
       this.userService = new userService()
       this.storeSercice = new storeService()
   }

   componentDidMount = () => {
    this.setAllUsers()

}

    setAllUsers = () => {
    this.userService
            .getAllUsers()
            .then(response => {
                console.log('estos son los usuarios', response.data)
                this.setState({users : response.data})})
            .catch(err => console.log('Error:', err))

    }

    setFilterRole = (filterRole) => {
        this.setState({filterRole})
}

    handleInputChange = e => {
        let { name, value} = e.target
        this.setState({ [name]: value })
}

 



    deleteOneUser = id => {
        const update = this.state.users
        const index = update.findIndex(elem => elem.id === id)  //ojo y si tiene una tienda???
        update.splice(index-1, 1)

        this.userService
            .deleteUser(id)
            .then(this.setState({users : update}))
            .catch(err => console.log('Error:', err))

    }




   render(){

    return(
        <>
        <Container className='pt-3'>
        <Row className="justify-content-between">
                    <Col  className="searchBar">
                        <Form.Control className="input" type="text" name="search" value={this.state.search} onChange={this.handleInputChange} placeholder='Introduce el nombre del producto'/>
                    </Col>
                    <Col  lg="auto" className="filters" className="d-flex justify-content-center">
                        <ButtonGroup className="d-none d-md-block" >
                            <Button variant="outline-dark" name='admin' onClick= { () => this.setFilterRole('admin')}>Administradores</Button>
                            <Button variant="outline-dark" name='buyer' onClick={ () => this.setFilterRole('buyer')}>Clientes</Button>
                            <Button variant="outline-dark" name='producer' onClick={ () =>this.setFilterRole('producer')}>Tiendas</Button>
 
                            <Button variant="outline-primary" name='clear' onClick={ () => this.setFilterRole('')}>Limpiar</Button>
                        </ButtonGroup>
                    </Col>
        </Row>
        
        {(this.state.filterRole? this.state.users.filter(elm => elm.role === this.state.filterRole) : this.state.users)
                        .filter(elm => elm.firstName.includes(this.state.search))
                        .map(elem =><EachUser key={elem.id} {...elem} deleteUser={this.deleteOneUser} setShow ={this.props.setShow}/> )}


        </Container>
        
        </>
    )
   }

}

export default AllUsers