import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Container'

import Login from './Login'

const LoginContainer = (props) => {
    return (
        <Container className="page d-flex justify-content-center">
            <Row className="pt-3 pt-lg-5 d-flex flex-wrap" style={{maxHeight:80}}>
                <Col className="col-10 col-lg-2 text-lg-right mb-0 pb-0 pt-lg-5 mr-lg-2">
                    <h3 >Inicio de Sesión</h3>
                </Col>
                <Col className="col-10 col-lg-6 ml-lg-2">
                    <Login {...props} />
                </Col>
            </Row>
        </Container>
       
    )
}

export default LoginContainer