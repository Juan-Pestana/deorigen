import React, {Component} from 'react'


class PersonalInfo extends Component {

    constructor() {
       super()
       this.state = {
           quantity : 0

       }
   }

    // peticion a la base de datos, para  estado actualizado 

   render (){
       console.log(this.props)

    return(
        <>
        <div className='container ml-4'>
            <button onClick={()=>this.props.setShow('PersonalInfoForm')} className='btn btn-outline-secondary btn-sm float-right mr-3'>Editar</button>
    
            <label className = 'text-muted'>Nombre</label>
            <p>{this.props.user.firstName}</p>
            <hr className='mb-2'/>
            <label className = 'text-muted'>Apellido</label>
            <p>{this.props.user.lastName}</p>
            <hr className='mb-2'/>
            <label className = 'text-muted'>Dirección</label>
            <p>{this.props.user.address}</p>
            <hr className='mb-2'/>
            <label className = 'text-muted'>Email</label>
            <p>{this.props.user.email}</p>
            <hr className='mb-2'/>
            <label className = 'text-muted'>Teléfono</label>
            <p>{this.props.user.phone}</p>
            <hr className='mb-2'/>
        </div>
        
        </>
    )

   }

}

export default PersonalInfo