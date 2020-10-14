import React from 'react'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import IndexStoreList from './IndexStoreList'



const Index = () => {
    return (
        <Container className="page">
            <h1>deOrigen</h1>
            <Link to="/shop">
                <Button size="sm" variant="dark" style={{ marginTop: '20px' }}>Vamos alatienda</Button>
            </Link>
            <IndexStoreList />
        </Container>
    )
}

export default Index