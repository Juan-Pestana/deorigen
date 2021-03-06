import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import NavBar from './layout/NavBar'
import Index from './pages/index/Index'
import Shop from './pages/shop/Shop'
import LoginContainer from './pages/login/LoginContainer'
import Account from './pages/account/Account'
import SignupContainer from './pages/signup/SignupContainer' 
import Order from './pages/order/Order' 
import ThankYou from './pages/thankyou/ThankYou' 
import StoreList from './pages/storeList/StoreList'
import Store from './pages/store/Store'
import Footer from './layout/Footer'


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
      <div style={{position: "relative", height: 'fitContent'}}>
      <NavBar setTheUser={this.setTheUser} {...this.props} loggedInUser={this.state.loggedInUser} refreshPage={this.refreshPage}/>
      <Switch>
          { this.state.refreshUrl && <Redirect push to={this.state.refreshUrl} onLoad={this.refreshPage('')} ></Redirect>}
          <Route path='/account' render={() => this.state.loggedInUser ? <Account loggedInUser={this.state.loggedInUser} refreshPage={this.refreshPage}/> : <Redirect to="/login" />} />
          <Route path="/" exact render={() => <Index />} />
          <Route path="/shop" render={() => <Shop />} />
          <Route path="/storelist" render={props => <StoreList {...props} />} />
          <Route path="/store/:storeId" render={props  => <Store {...props} />} />
          {/* <Route path="/signup" render={props => <Signup setTheUser={this.setTheUser} {...props} />} /> */}
          <Route path="/login" render={props =>  <LoginContainer setTheUser={this.setTheUser} {...props} />} />
          <Route path="/signup" render={props => <SignupContainer  {...props} />} />
          <Route path="/order" exact render={(props)=> this.state.loggedInUser ? <Order setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} {...props}></Order>  : <Redirect to="/login" />} />
          <Route path="/order/thankyou/:orderId" render={props => <ThankYou setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} {...props} />} />
        </Switch>
        <Footer/>
      </div>
      
        
      
      
      </>
    );
  }
}

export default App;