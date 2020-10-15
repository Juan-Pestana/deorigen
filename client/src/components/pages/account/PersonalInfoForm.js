import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import userService from '../../../services/user.services'

class PersonalInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            phone: '',

        }
        this.userService = new userService()
    }


    componentDidMount = () => {
        this.setUser()
        
    }
    setUser = () => {
        this.setState ({...this.props.user})
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()

        this.userService
            .updateUser(this.props.user._id, this.state)
            .then(() => {
                this.props.setShow('PersonalInfo')
                // this.props.closeModal()
                // this.props.refreshList()
            })
            .catch(err => console.log('Erroro!!', { err }))
    }




    render() {

        return (

            <Form onSubmit={this.handleFormSubmit} className='pt-4'>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" name="address" value={this.state.address} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="text" name="phone" value={this.state.phone} onChange={this.handleInputChange} />
                </Form.Group>

                <Button variant="dark" type="submit">Enviar Cambios</Button>
            </Form>
        )
    }
}

export default PersonalInfoForm