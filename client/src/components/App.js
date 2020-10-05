import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import NavBar from './layout/NavBar'
import Index from './pages/index/Index'
import Shop from './pages/shop/Shop'


import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: undefined
    }
    // this.authService = new authService()
  }



  render() {
    return (
      <>
      <NavBar />
      <Switch>
          <Route path="/" exact render={() => <Index />} />
          <Route path="/shop" render={() => <Shop />} />
      </Switch>
        

        
      </>
    );
  }
}

export default App;