import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import NavDropdown from 'react-bootstrap/NavDropdown';

import './NavBar.css'

import authService from './../../services/auth.service'

import Signup from './../pages/signup/Signup'
import Login from './../pages/login/Login'
import Cart from './../pages/cart/Cart'




export default class extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showSignupModal : false,
            showLoginModal : false,
            showCartModal : false,
        }
        this.authService = new authService()

    }

    logoutUser = () => {
        this.authService
        .logout()
        .then(() => this.props.setTheUser(null))
        .catch(err => console.log( 'error', err))
    }

    handleSignupModal = showSignupModal => this.setState({ showSignupModal })
    handleLoginModal = showLoginModal => this.setState({ showLoginModal })
    
    handleCartModal = (showCartModal,link) => {
        this.setState({ showCartModal })
        this.props.refreshPage(link)
        }   


    render() {
        return (
            <>
            <Navbar bg="light" expand="lg">
            <Link to="/">
                <Navbar.Brand>
                    <img
                        src="https://lh3.googleusercontent.com/proxy/x66LNY4JqxId1kUgVuwA2adPZxsuiU68JjPs7iT79tzI9ps36X9TfvPiZJGIySrORiXBP7H7EiXyqavBJ04Uc8N4zNKwS9Wbvn3iqdAaeYpu791iBg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />{' '} De Origen
                </Navbar.Brand>
            </Link>
          
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/shop">Tienda</Link>
      {/* {!this.props.loggedInUser && <div className="nav-link" onClick={() => this.handleSignupModal(true)}>Regístrate</div>}
      {!this.props.loggedInUser && <div className="nav-link" onClick={() => this.handleLoginModal(true)}>Inicia Sesión</div>}
      {this.props.loggedInUser && <div className="nav-link" onClick={this.logoutUser}>Cerrar sesión</div>}
      <Link className="nav-link" to="/profile">- Hola, {this.props.loggedInUser ? this.props.loggedInUser.firstName : 'invitado'}</Link> */}
      <NavDropdown title={this.props.loggedInUser ? this.props.loggedInUser.firstName : 'Invitado'} id="collasible-nav-dropdown">
        {this.props.loggedInUser && <NavDropdown.Item><Link to='/account' className= 'dropdown-item'>Tu Cuenta</Link></NavDropdown.Item>}
        {this.props.loggedInUser && <NavDropdown.Item onClick={this.logoutUser }>Cerrar Sesión</NavDropdown.Item>}
        
        {!this.props.loggedInUser &&<NavDropdown.Item onClick={() => this.handleLoginModal(true)}>Inicia Sesión</NavDropdown.Item>}
        {!this.props.loggedInUser &&<NavDropdown.Item onClick={() => this.handleSignupModal(true)}>Regístrate</NavDropdown.Item>}

      </NavDropdown>
      <div className="nav-link" onClick={() => this.handleCartModal(true)}>Carrito</div>
    </Nav>

  </Navbar.Collapse>
</Navbar>

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
    <Modal.Title>Registro de usuario</Modal.Title>
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