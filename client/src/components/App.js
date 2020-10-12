import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import NavBar from './layout/NavBar'
import Index from './pages/index/Index'
import Shop from './pages/shop/Shop'
import Login from './pages/login/Login'
import Account from './pages/account/Account'
import Signup from './pages/signup/Signup' 
import Cart from './pages/cart/Cart' 
import Order from './pages/order/Order' 
import ThankYou from './pages/thankyou/ThankYou' 

import authService from './../services/auth.service'


import './App.css'



class App extends Component {

        constructor() {
          super()
          this.state = {
            loggedInUser: undefined,
            refreshUrl:''
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

    refreshPage = (pathname) => {
      this.setState({refreshUrl : pathname})
    }





  render() {
    return (
      <>
      <NavBar setTheUser={this.setTheUser} {...this.props} loggedInUser={this.state.loggedInUser} refreshPage={this.refreshPage}/>
      <Switch>
          { this.state.refreshUrl && <Redirect push to={this.state.refreshUrl} onLoad={this.refreshPage('')} ></Redirect>}
          <Route path='/account' render={() => this.state.loggedInUser ? <Account loggedInUser={this.state.loggedInUser}/> : <Redirect to="/" />} />
          <Route path="/" exact render={() => <Index />} />
          <Route path="/shop" render={() => <Shop />} />
          {/* <Route path="/signup" render={props => <Signup setTheUser={this.setTheUser} {...props} />} /> */}
          <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
          <Route path="/order" render={props => <Order setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} {...props} />} />
          <Route path="/order/thankyou/:orderId" render={props => <ThankYou setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} {...props} />} />
      </Switch>
        
      
        
      </>
    );
  }
}

export default App;