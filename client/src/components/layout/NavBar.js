import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/Nav'




export default class extends Component {

    constructor(props) {
        super(props)

    }


    render() {
        return (
            <>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">
      <img
        src="https://lh3.googleusercontent.com/proxy/x66LNY4JqxId1kUgVuwA2adPZxsuiU68JjPs7iT79tzI9ps36X9TfvPiZJGIySrORiXBP7H7EiXyqavBJ04Uc8N4zNKwS9Wbvn3iqdAaeYpu791iBg"
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/shop">Tienda</Link>
      {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>

  </Navbar.Collapse>
</Navbar>

            </>
            
        )
    }
}