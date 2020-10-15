import React from 'react'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'

import IndexStoreList from './IndexStoreList'
import ControlledCarousel from './Carousel'

import logo from './LogoHome.svg'
import './index.css'




const Index = () => {
    return (
        <Container className="page pb-5 index">
            <h1 className='text-center'><img src={logo} alt="Logo De Origen" style={{width : '50%'}}/> </h1>
        
            <ControlledCarousel />
            <Row className='bg-dark text-secondary features d-flex justify-content-around'>
                <Col md="3" className="text-center p-3">
                    <img src="https://res.cloudinary.com/pestana/image/upload/v1602695107/deorigen/field_lgfrzr.png" alt="campo"></img>
                    <h6>Directo desde el campo</h6>
                    <p>Oink oink wind. Post pounder calf, hay or duck is, tool shed horse. Augers oats hen cowpies. Forage Harvester rakes peacocks, squeal garden woof.</p>
                </Col>   
                        
                <Col md="3" className="text-center p-3">
                    <img src="https://res.cloudinary.com/pestana/image/upload/v1602695107/deorigen/cold_copia_g3o3f1.png" alt="frio"></img>
                    <h6>Manteniendo la Cadena de frío</h6>
                    <p>Oink oink wind. Post pounder calf, hay or duck is, tool shed horse. Augers oats hen cowpies. Forage Harvester rakes peacocks, squeal garden woof.</p>
                </Col>   
            
                <Col md="3" className="text-center p-3">
                    <img src="https://res.cloudinary.com/pestana/image/upload/v1602695107/deorigen/saving_eqwtoj.png" alt= 'intermediarios'></img>
                    <h6>Ahorrando intermediarios</h6>
                    <p>Oink oink wind. Post pounder calf, hay or duck is, tool shed horse. Augers oats hen cowpies. Forage Harvester rakes peacocks, squeal garden woof.</p>
                </Col>   
            </Row>


            <IndexStoreList />
        </Container>
    )
}

export default Index