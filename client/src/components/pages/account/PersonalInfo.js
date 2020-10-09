import React, {Component} from 'react'

import userService from './../../../services/user.services'


class PersonalInfo extends Component {

    constructor() {
       super()
       this.state = {
           user : {},
           quantity : 0

       }
       this.userService = new userService()
   }

   componentDidMount = () => this.setUserFromDB()

   setUserFromDB = () => {
       this.userService
            .getOneUser(this.props.user._id)
            .then(response => this.setState({user : response.data}))
            .catch(err => console.log('Error:', err))

   }

    


   render (){
    

    return(
        <>
        <div className='container ml-4'>
            <button onClick={()=>this.props.setShow('PersonalInfoForm')} className='btn btn-outline-secondary btn-sm float-right mr-3'>Editar</button>
    
            <label className = 'text-muted'>Nombre</label>
            <p>{this.state.user.firstName}</p>
            <hr className='mb-2'/>
            <label className = 'text-muted'>Apellido</label>
            <p>{this.state.user.lastName}</p>
            <hr className='mb-2'/>
            <label className = 'text-muted'>Dirección</label>
            <p>{this.state.user.address}</p>
            <hr className='mb-2'/>
            <label className = 'text-muted'>Email</label>
            <p>{this.state.user.email}</p>
            <hr className='mb-2'/>
            <label className = 'text-muted'>Teléfono</label>
            <p>{this.state.user.phone}</p>
            <hr className='mb-2'/>
        </div>
        
        </>
    )

   }

}

export default PersonalInfo