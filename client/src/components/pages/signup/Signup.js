import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import authService from '../../../services/auth.service'

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
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
            .signup(this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.closeModal()
                // this.props.history.push('/')
            })
            .catch(err => console.log('Error:', { err }))
    }


    render() {
        console.log(this.props)
        return (

            // <Container>
            //     <main>
            //         <Row className="justify-content-center">
            //             <Col md={{ span: 5 }}>
            <>
                            
                            <Form onSubmit={this.handleFormSubmit}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>

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
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control type="text" name="phone" value={this.state.phone} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Button variant="dark" type="submit">Registrarme</Button>
                            </Form>
                        </>
            //             </Col>
            //         </Row>
            //     </main>
            // </Container>
        )
    }
}

export default Signup