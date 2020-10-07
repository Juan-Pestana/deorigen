import React, {Component} from 'react'

class Account extends Component {
    constructor(){
        super()
        this.state ={

        }
    }


    render(){
        return(
        <>
            <h1>Hola {this.props.loggedInUser.firstName}</h1>
        </>
        )
    }

}

export default Account