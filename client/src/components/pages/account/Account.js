import React, {Component} from 'react'

import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'

import storeService from './../../../services/store.services'

import PersonalInfo from './PersonalInfo'
import PersonalInfoForm from './PersonalInfoForm'
import StoreSettings from './StoreSettings'
import StoreSettingsForm from './StoreSettingsForm'
import CreateProductForm from './CreateProductForm'
import EditProduct from './EditProduct'
import AllUsers from './AllUsers'
import AllStores from './AllStores'
import AllOrders from './AllOrders'

import './account.css'
// import Store from '../../../../../server/models/store.model'

class Account extends Component {
    constructor(props){
        super(props)
        this.state ={
            user : null,
            store: null,
            show: 'PersonalInfo',
            productToEdit: null,
            storeToEdit: null

        }
        this.storeService = new storeService()
    }

    componentDidMount = () => this.setUser()


    setUser = () => {

            
            this.setState({user : this.props.loggedInUser}, ()=>{
              
                this.setStore()
            })     
    }


    setStore = () => {

        this.props.loggedInUser.store ?

                this.storeService
                    .getOneStore(this.props.loggedInUser.store)
                    .then(response => this.setState({store: response.data}))
                    .catch(err => console.log('Error:', err))
        
                    :

                    console.log('no tiene store')
    }


    setShow = (pageShow) => {
      
        this.setState({show : pageShow})
    }

    productToEdit = id =>{
       
        this.setState({productToEdit : id}, this.setShow('EditProduct'))
    }

    storeToEdit = id => {
        this.setState({storeToEdit : id}, this.setShow('AdminStoreUpdate'))
    }


    render(){

        return(

        <Container className="page">
            <div className = 'row accountPage'>
                <nav className = 'col-md-3 d-none d-md-flex flex-column bg-light align-items-right pt-5 account-options' > 
                        <div onClick={() => this.setShow('PersonalInfo')} className='nav-link p-3 text-right'>Información Personal</div>
                        <div onClick={() => this.setShow('AllOrders')} className='nav-link p-3 text-right'>Ultimos Pedidos</div>
                        
                        {this.state.store && <div onClick={() => this.setShow('StoreSettings')} className='nav-link p-3 text-right'>Tu tienda</div>}
                    {this.state.user ? this.state.user.role ==='admin' && <div className='nav-link p-3 text-right'>Panel de Administrador
                        <div onClick={() => this.setShow('AllUsers')} className='nav-link py-3 px-0 text-right'>Todos los Usuarios</div>
                        <div onClick={() => this.setShow('AllStores')}className='nav-link py-3 px-0  text-right'>Todas las Tiendas</div>
                    </div> : console.log('no es admin')}
                </nav>
                           
                    <Dropdown className ="d-md-none btn-light btn-block" >
                    <Dropdown.Toggle className ="d-md-none btn-light btn-block" variant="light" id="dropdown-basic">
                        Menú
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => this.setShow('PersonalInfo')} >Información Personal</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.setShow('LastOrders')} >Ultimos Pedidos</Dropdown.Item>
                        {this.state.store && <Dropdown.Item onClick={() => this.setShow('StoreSettings')} >Tu tienda</Dropdown.Item>}
                        {this.state.user ?
                            this.state.user.role === 'admin' && <><Dropdown.Item >Panel de Administrador</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setShow('AllUsers')} >Todos los Usuarios</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setShow('AllStores')}>Todas las Tiendas</Dropdown.Item></>
                            :
                            console.log('no es admin')}
                   
                    </Dropdown.Menu>
                    </Dropdown>
                    

                    
                <div className = 'col-md-9 d-flex flex-column accountContent '> 

                {this.state.show === 'PersonalInfo' && <PersonalInfo user={this.props.loggedInUser} setShow={this.setShow}></PersonalInfo>}   
                {this.state.show === 'PersonalInfoForm' && <PersonalInfoForm user={this.props.loggedInUser} setShow={this.setShow}></PersonalInfoForm>}
                {this.state.show === 'AllOrders' && <AllOrders user={this.props.loggedInUser} setShow={this.setShow}></AllOrders>}
                {this.state.show === 'StoreSettings' && <StoreSettings user={this.props.loggedInUser} setShow={this.setShow} productToEdit = {this.productToEdit} refreshPage={this.props.refreshPage}></StoreSettings>}
                {this.state.store && this.state.show === 'StoreSettingsForm' && <StoreSettingsForm store={this.state.store} setShow={this.setShow} ></StoreSettingsForm>}
                {this.state.store && this.state.show === 'CreateProductForm' && <CreateProductForm store={this.state.store} setShow={this.setShow}></CreateProductForm>}
                {this.state.store && this.state.show === 'EditProduct' && <EditProduct product={this.state.productToEdit} setShow={this.setShow}></EditProduct>}
                {this.state.show === 'AllUsers' && <AllUsers setShow = {this.setShow}/>}
                {this.state.show === 'AllStores' && <AllStores storeToEdit = {this.storeToEdit} />}
                {this.state.show === 'AdminStoreUpdate' && <StoreSettingsForm storeToEdit={this.state.storeToEdit} setShow={this.setShow} adminUpdate = {true}></StoreSettingsForm> }
                </div>
                
                
            </div>
           
        </Container>

        )
    }

}

export default Account