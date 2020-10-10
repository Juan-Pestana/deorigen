import React, {Component} from 'react'

import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import userService from './../../../services/user.services'
import storeService from './../../../services/store.services'




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

    // handleInputChange = e => {
    //      const {name, value} = e.target
    //     this.setState({ [name] : value})
    // }

    handleFormSubmit =  elem => {
        const newStore = {
            storeName : `la tienda de ${elem.firstName}`,
            tagline : `prueba algo con gancho`,
            description: 'modifica este texto y háblanos de tu tienda, tus productos y tu entorno',
            owner: elem._id

        }
        const allUsers = [...this.state.users]
        const index = this.state.users.indexOf(elem)
        const user = {...elem}
        user.role = this.state.newRole
        console.log('estoy aquí y juan quiere ser', user.role)
        if(user.role === 'producer'){
            this.storeSercice
                .newStore(newStore)
                .then(response =>{
                    console.log(response)
                    user.store = response.data._id} )

                .then(() => this.userService.updateUser(user._id, user))
                .then(()=> allUsers[index] = user)
                .then(()=>this.setState({users : allUsers})
                // .catch(err => console.log('Error:', err))
                            
                    

            )} else if(user.store && user.role === 'buyer' ){
                    this.storeSercice.deleteStore(user.store)
                    .then(() => this.userService.updateUser(user._id, user))
                    .then(()=> allUsers[index].store = undefined)
                    .then(() => this.setState({users : allUsers}))
                    .catch(err => console.log('Error:', err))
            
        } else{
            this.userService.updateUser(user._id, user)
            .then(()=> allUsers[index] = user)
            .then(()=> this.setState({users : allUsers}))
            .catch(err => console.log('Error:', err))
        }
        
           

    }

    deleteOneUser = id => {
        const update = this.state.users
        const index = update.findIndex(elem => elem.id === id)
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
        {this.state.users && this.state.users.map(elem => 
            <div className='row' key={elem._id}>
                <div className=' col-sm-6 col-md-4'>
                    <label className='text-muted'>Nombre</label>
                    <p>{elem.firstName} {elem.lastName}</p>
                </div>
                <div className=' col-sm-6 col-md-3'>
                    <label className='text-muted'>Rol</label>
                    <p>{elem.role}</p>
                </div>
                <div className=' col-sm-12 col-md-5'>
                    <Button  onClick={() => this.deleteOneUser(elem._id)} variant='dark' size='sm' className='mb-2 d-block ml-auto'>Eliminar</Button>
                <Form onSubmit={this.handleFormSubmit(elem)}>
                    <Form.Group>
                        <div className='d-flex'>
                        <Form.Control className='mr-4' as="select" size='sm' name="newRole"  value={this.state.newRole} onChange={this.handleInputChange}>
                        <option value="buyer">Cliente</option>
                        <option value="producer">Tienda</option>
                        <option value="admin">Administrador</option>
                        </Form.Control>    
                        <Button onClick={()=>this.handleFormSubmit(elem)}variant='outline-dark ' size='sm'>Nuevo/Rol</Button>  
                        </div>
                                   
                    </Form.Group>
                    

                </Form>
                    
                </div>
            </div>
            )}

        </div>
        
        </>
    )
   }

}

export default AllUsers