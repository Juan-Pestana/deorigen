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

  



    render() {
        console.log(this.props)
        return (
            <>
            <div className='row'>
                <div className=' col-sm-6 col-md-4'>
                    <label className='text-muted'>Nombre de la tienda</label>
                    <p>{this.props.storeName}</p>
                </div>
                <div className=' col-sm-6 col-md-3'>
                    <label className='text-muted'>Nombre del titular</label>
                    <p>{this.props.owner.firstName} {this.props.owner.lastName}</p>
                </div>
                <div className=' col-sm-12 col-md-5'>
                    <Button  onClick={() => this.deleteOneStore(this.props._id)} variant='dark' size='sm' className='mb-2 d-block ml-auto'>Eliminar</Button>
                    <Button  onClick={() => this.editOneStore(this.props._id)} variant='dark' size='sm' className='mb-2 d-block ml-auto'>Editar</Button>
                {/* <Form onSubmit={this.handleFormSubmit}>
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
                    

                </Form> */}
                    
                </div>
            </div>

            </>

        )
    }
}

export default EachUser