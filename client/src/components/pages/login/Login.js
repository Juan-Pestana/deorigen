import React, { Component } from 'react'
import {Link} from 'react-router-dom'


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import authService from '../../../services/auth.service'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
        this.authService = new authService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {

        e.preventDefault()

        this.authService
            .login(this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.closeModal? this.props.closeModal() : this.props.history.goBack()
                
            })
            .catch(err => {
                this.setState({errorMessage : err.response.data.message})
                console.log('Error:', { err })})
    }

    handleLink = () => {
        this.props.closeModal && this.props.closeModal()
        
    }


    render() {

        return (

                
                            <Form onSubmit={this.handleFormSubmit} className="mt-5">
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>
                                <div className = 'd-flex'>
                                    <Button variant="dark" type="submit">Acceder</Button>
                                    <p className='text-danger ml-5 my-auto'>{this.state.errorMessage}</p>
                                </div>
                                <p className="mt-2">¿No tienes cuenta? <Link to="/signup" className="nav.link" onClick={() =>this.handleLink()}>Regístrate</Link> </p>
                                
                            </Form>

        )
    }
}

export default Login