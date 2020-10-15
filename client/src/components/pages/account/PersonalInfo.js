import React, {Component} from 'react'

import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import userService from './../../../services/user.services'


class PersonalInfo extends Component {

    constructor() {
       super()
       this.state = {
           isClosing: '',
           user : {}

       }
       this.userService = new userService()
   }

   componentDidMount = () => {
        this.setUserFromDB()
        this.checkCloseOrder()
   }

   setUserFromDB = () => {
       this.userService
            .getOneUser(this.props.user._id)
            .then(response => this.setState({user : response.data}))
            .catch(err => console.log('Error:', err))

   }

   checkCloseOrder = () => {
    this.props.closing && this.setState({isClosing : true})
}
    // peticion a la base de datos, para  estado actualizado 

   render (){
    

    return(
        <>
        <h1>Tu Información Personal</h1>
        <div className='container my-4 mx-0 mx-lg-4'>
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

            {this.state.isClosing && 
                        <Row style={{ padding: "25px 25px 25px 0"}}>
                            <Button style={{ padding: "10px"}}className="btn btn-secondary btn-block" 
                                    onClick={() => this.props.setShow('PaymentInfoForm')}> Confirmar Datos </Button> 
                        </Row>
            }
        </div>
        
        </>
    )

   }

}

export default PersonalInfo