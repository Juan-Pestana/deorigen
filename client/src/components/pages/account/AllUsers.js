import React, {Component} from 'react'

import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import userService from './../../../services/user.services'
import storeService from './../../../services/store.services'
import EachUser from './EachUser'




class AllUsers extends Component {

    constructor() {
       super()
       this.state = {
           users : [],
           newRole : ""

       }
       this.userService = new userService()
       this.storeSercice = new storeService()
   }

   componentDidMount = () => {
    this.setAllUsers()

}

    setAllUsers = () => {
    this.userService
            .getAllUsers()
            .then(response => {
                console.log('estos son los usuarios', response.data)
                this.setState({users : response.data})})
            .catch(err => console.log('Error:', err))

    }

 



    deleteOneUser = id => {
        const update = this.state.users
        const index = update.findIndex(elem => elem.id === id)  //ojo y si tiene una tienda???
        update.splice(index-1, 1)

        this.userService
            .deleteUser(id)
            .then(this.setState({users : update}))
            .catch(err => console.log('Error:', err))

    }




   render(){

    return(
        <>
        <div className= 'container'>
        {this.state.users && this.state.users.map(elem => <EachUser key={elem.id} {...elem} deleteUser={this.deleteOneUser} setShow ={this.props.setShow}/> )}

        </div>
        
        </>
    )
   }

}

export default AllUsers