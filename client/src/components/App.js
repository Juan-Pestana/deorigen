import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import NavBar from './layout/NavBar'
import Index from './pages/index/Index'
import Shop from './pages/shop/Shop'
import Login from './pages/login/Login'
import Account from './pages/account/Account'
import Signup from './pages/signup/Signup' 

import authService from './../services/auth.service'


import './App.css'

class App extends Component {

        constructor() {
          super()
          this.state = {
            loggedInUser: undefined
          }
          this.authService = new authService()
          this.initializeCart()
        }

  initializeCart = () => {
    let cartLocalStorage = (localStorage.getItem('deOrigenCart'))
    cartLocalStorage ? console.log('Items en el carrito',cartLocalStorage) : localStorage.setItem('deOrigenCart', JSON.stringify([]))
    //localStorage.setItem('deOrigenCart', JSON.stringify([]))
  }      
    
  componentDidMount = () => this.fetchUser()

  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log('El usuario es', this.state.loggedInUser))
      
  
  fetchUser = () => {
    this.authService
        .isLoggedIn()
        .then(response => this.setState({ loggedInUser: response.data }))
        .catch(err => this.setState({ loggedInUser: null }))
    }





  render() {
    return (
      <>
      <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser}/>
      <Switch>
          <Route path='/account' render={() => this.state.loggedInUser ? <Account loggedInUser={this.state.loggedInUser}/> : <Redirect to="/" />} />
          <Route path="/" exact render={() => <Index />} />
          <Route path="/shop" render={() => <Shop />} />
          {/* <Route path="/signup" render={props => <Signup setTheUser={this.setTheUser} {...props} />} /> */}
          <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
      </Switch>
        

        
      </>
    );
  }
}

export default App;