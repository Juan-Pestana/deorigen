import React, {Component} from 'react'

import storeService from './../../../services/store.services'

class Account extends Component {
    constructor(){
        super()
        this.state ={
            user : {},
            store: {}

        }
        this.storeService = new storeService()
    }

    // componentDidMount = () => this.setUser()

    // setUser =() => {

    //     this.props.loggedInUser.store ? 
    //     this.storeService
    //         .getOneStore(this.props.loggedInUser.store)
    //         .then(this.state.store = response.data)

  
        // this.userService
        //     .getOneUser(this.props.loggedInUser._id)
        //     .then(response => this.setState({user: response.data}))
        //     .catch(err => console.log('Error:', err))

    // }




    render(){
         console.log(this.state.user)
        return(
        <>
            <h1>Hola {this.props.loggedInUser.store}</h1>
        </>
        )
    }

}

export default Account