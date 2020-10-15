import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import NavDropdown from 'react-bootstrap/NavDropdown';

import './NavBar.css'
import logo from './LogoDeOrigen_home.png'

import authService from './../../services/auth.service'

import Signup from './../pages/signup/Signup'
import Login from './../pages/login/Login'
import Cart from './../pages/cart/Cart'
import ProductCounter from './ProductCounter'



export default class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showSignupModal : false,
            showLoginModal : false,
            showCartModal : false,
        }
        this.authService = new authService()
        this.wrapper = React.createRef();
    }

    logoutUser = () => {
        localStorage.setItem('deOrigenCart', JSON.stringify([]))
        this.authService
        .logout()
        .then(() => this.props.setTheUser(null))
        .catch(err => console.log( 'error', err))
    }

    handleSignupModal = showSignupModal => this.setState({ showSignupModal })
    handleLoginModal = showLoginModal => this.setState({ showLoginModal })
    
    handleCartModal = (showCartModal,link) => {
        this.setState({ showCartModal })
        !this.props.loggedInUser && link === '/order'? this.handleLoginModal (true,) : this.props.refreshPage(link)
        }   


    render() {
        return (
            <>
            <Container fluid="md" className="bg-dark">
            
            <Navbar className="NavBar px-lg-5 px-xs-0" bg="dark" variant="dark" expand="md" fixed="top" >
            <Link to="/">
                <Navbar.Brand>
                <img
                    alt=""
                    src={logo}
                   
                    height="50vh"
                    className="d-inline-block align-top"
                />
                    {' '} 
                </Navbar.Brand>
            </Link>
          
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link className="nav-link" to="/">Inicio</Link>
                    <Link className="nav-link" to="/shop">Tienda</Link>
                    <Link className="nav-link" to="/storeList">Productores</Link>
                    
                    <NavDropdown  className="nav-dropdown dropdown" title={this.props.loggedInUser ? this.props.loggedInUser.firstName : 'Invitado'} id="collasible-nav-dropdown">
                        {this.props.loggedInUser && <NavDropdown.Item><Link to='/account' className= 'dropdown-item'>Tu Cuenta</Link></NavDropdown.Item>}
                        {this.props.loggedInUser && <NavDropdown.Item onClick={this.logoutUser }>Cerrar Sesión</NavDropdown.Item>}
                        
                        {!this.props.loggedInUser &&<NavDropdown.Item onClick={() => this.handleLoginModal(true)}>Inicia Sesión</NavDropdown.Item>}
                        {!this.props.loggedInUser &&<NavDropdown.Item onClick={() => this.handleSignupModal(true)}>Regístrate</NavDropdown.Item>}

                    </NavDropdown>
                    <div className="nav-link cartLink" onClick={() => this.handleCartModal(true)}>Carro<ProductCounter/></div>
                </Nav>

            </Navbar.Collapse>
            </Navbar>
            </Container>
            

<Modal show={this.state.showSignupModal} onHide={() => this.handleSignupModal(false)}>
    <Modal.Header closeButton>
    <Modal.Title>Registro de usuario</Modal.Title>
    </Modal.Header>
    <Modal.Body>
                <Signup  setTheUser = {this.props.setTheUser} closeModal={() => this.handleSignupModal(false)}/>
    </Modal.Body>
</Modal>

<Modal show={this.state.showLoginModal} onHide={() => this.handleLoginModal(false)}>
    <Modal.Header closeButton>
    <Modal.Title>Inicia sesión</Modal.Title>
    </Modal.Header>
    <Modal.Body>
                <Login  setTheUser = {this.props.setTheUser} closeModal={() => this.handleLoginModal(false)}/>
    </Modal.Body>
</Modal>

<Modal show={this.state.showCartModal} onHide={() => this.handleCartModal(false, window.location.pathname)} size="lg">
    <Modal.Header closeButton>
    <Modal.Title>Tu Carrito</Modal.Title>
    </Modal.Header>
    <Modal.Body>
                <Cart  setTheUser = {this.props.setTheUser} closeModal={this.handleCartModal}/>
    </Modal.Body>
</Modal>

            </>
            
        )
    }
}