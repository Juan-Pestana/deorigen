import React, {Component} from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import storeService from './../../../services/store.services'
import userService from './../../../services/user.services'



class EachUser extends Component {

     constructor() {
        super()
        this.state = {
            username : '',
            firstName : '',
            lastName : '',
            email : '',
            role : '',
            store : '',
            address : '',
            orderHistory: [],
            currentOrder: {},


        }
        this.storeService = new storeService()
        this.userService = new userService()
    }

    componentDidMount = () => {
        this.setUser()
    
    }

    setUser = () =>{
        this.setState({...this.props})
    }

    handleInputChange = e => {
        const {name, value} = e.target
       this.setState({ [name] : value})
   }

   handleFormSubmit = () => {
       const newStore = {
           storeName : `la tienda de ${this.state.firstName}`,
           tagline : 'prueba algo con gancho',
           description: 'hablanos de tus productos y del entorno',
           owner: this.props._id
       }

    if(this.state.role === 'producer' && !this.state.store){
        this.storeService
            .newStore(this.props._id, newStore)
            .then(response => this.setState({store : response.data.store }))
            .then(()=>this.props.setShow('AllUsers'))
    }else if (this.state.role === 'buyer' && this.state.store ){
        this.storeService
            .deleteStore(this.state.store)
            .then(()=> this.setState({store : undefined}))
            .then(()=>this.props.setShow('AllUsers'))
    }else if(this.state.role === "admin"){
        this.userService
            .updateUser(this.props.id, this.state )
            .then(()=>this.setState({role : 'admin'}))
            .then(()=>this.props.setShow('AllUsers'))
    } else {
        console.log('no hay cambios')
    }

   }





    render() {
        console.log(this.props)
        return (
            <>
            <div className='row'>
                <div className=' col-sm-6 col-md-4'>
                    <label className='text-muted'>Nombre</label>
                    <p>{this.props.firstName} {this.props.lastName}</p>
                </div>
                <div className=' col-sm-6 col-md-3'>
                    <label className='text-muted'>Rol</label>
                    <p>{this.props.role}</p>
                </div>
                <div className=' col-sm-12 col-md-5'>
                    <Button  onClick={() => this.deleteOneUser(this.props._id)} variant='dark' size='sm' className='mb-2 d-block ml-auto'>Eliminar</Button>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <div className='d-flex'>
                        <Form.Control className='mr-4' as="select" size='sm' name="role"  value={this.state.role} onChange={this.handleInputChange}>
                        <option value="buyer">Cliente</option>
                        <option value="producer">Tienda</option>
                        <option value="admin">Administrador</option>
                        </Form.Control>    
                        <Button  type='submit' variant='outline-dark ' size='sm'>Nuevo/Rol</Button>  
                        </div>
                                   
                    </Form.Group>
                    

                </Form>
                    
                </div>
            </div>

            </>

        )
    }
}

export default EachUser