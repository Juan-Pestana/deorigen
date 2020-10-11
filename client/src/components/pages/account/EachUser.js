
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'



class EachUser extends Component {

     constructor() {
        super()
        this.state = {
            user : ""

        }
    }



    setUser = () =>{
        this.setState({user: this.props.user})
    }

    handleInputChange = e => {
        const {name, value} = e.target
       this.setState({ user :{ ...this.state.user, [name] : value}})
   }

    handleFormSubmit =  e => {
        e.preventDefault()

        const newStore = {
            storeName : `la tienda de ${this.state.user.firstName}`,
            tagline : `prueba algo con gancho`,
            description: 'modifica este texto y háblanos de tu tienda, tus productos y tu entorno',
            owner: elem._id
        }

        // const allUsers = [...this.state.users]
        // const index = this.state.users.indexOf(elem)
        // const user = {...elem}
        // user.role = this.state.newRole
        // console.log('estoy aquí y juan quiere ser', user.role)
        const updUser = {...this.state.user}
        if(this.state.user.role === 'producer' && !this.state.user.store){
            
            this.storeSercice
                .newStore(newStore)
                .then(response =>{
                    console.log(response)
                    updUser.store = response.data._id} )

                .then(() => this.userService.updateUser(updUser._id, updUser))
                .then(()=> this.setState({user : updUser})
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

    render() {
        console.log(this.props)
        return (
            <>
            <div className='row'>
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
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <div className='d-flex'>
                        <Form.Control className='mr-4' as="select" size='sm' name="role"  value={this.state.user.role} onChange={this.handleInputChange}>
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