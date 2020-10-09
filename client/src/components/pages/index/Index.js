import React from 'react'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'


const Index = () => {
    return (
        <Container>
            <h1>deOrigen</h1>
            <Link to="/shop">
                <Button size="sm" variant="dark" style={{ marginTop: '20px' }}>Vamos alatienda</Button>
            </Link>
        </Container>
    )
}

export default Index