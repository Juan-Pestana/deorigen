import React, {Component} from 'react'

import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import userService from './../../../services/user.services'


class PersonalInfo extends Component {

    constructor() {
       super()
       this.state = {
           quantity : 0,
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

            {this.state.isClosing && 
                                <Row style={{ padding: "25px"}}>
                                    <Button style={{ padding: "10px"}}className="btn btn-secondary btn-block" 
                                            onClick={() => this.props.setShow('PaymentInfoForm')}> Confirmar Datos personales </Button> 
                                </Row>
            }
        </div>
        
        </>
    )

   }

}

export default PersonalInfo