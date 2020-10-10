import React, {Component} from 'react'

import storeService from './../../../services/store.services'

import PersonalInfo from './PersonalInfo'
import PersonalInfoForm from './PersonalInfoForm'
import StoreSettings from './StoreSettings'
import StoreSettingsForm from './StoreSettingsForm'
import CreateProductForm from './CreateProductForm'
import EditProduct from './EditProduct'

import './account.css'
// import Store from '../../../../../server/models/store.model'

class Account extends Component {
    constructor(props){
        super(props)
        this.state ={
            user : null,
            store: null,
            show: 'PersonalInfo',
            productToEdit: null

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
        console.log('cambia a ', pageShow)
        this.setState({show : pageShow})
    }

    productToEdit = id =>{
        this.setState({productToEdit : id}, this.setShow('EditProduct'))
    }


    render(){

        return(

        <>
        <div className = 'row accountPage'>
            <div className = 'col-3 d-flex flex-column pt-5 bg-light align-items-center'> 
                    <div onClick={() => this.setShow('PersonalInfo')} className='nav-link p-3'>Información Personal</div>
                    <div className='nav-link p-3'>Ultimos Pedidos</div>
                    <hr />
                {this.state.store && <div onClick={() => this.setShow('StoreSettings')} className='nav-link p-3'>Tu tienda</div> }


            </div>
            <div className = 'col-9 d-flex flex-column mt-5'> 

               {this.state.show == 'PersonalInfo' && <PersonalInfo user={this.props.loggedInUser} setShow={this.setShow}></PersonalInfo>}   
               {this.state.show == 'PersonalInfoForm' && <PersonalInfoForm user={this.props.loggedInUser} setShow={this.setShow}></PersonalInfoForm>}
               {this.state.show == 'StoreSettings' && <StoreSettings user={this.props.loggedInUser} setShow={this.setShow} productToEdit = {()=>this.productToEdit}></StoreSettings>}
               {this.state.store && this.state.show == 'StoreSettingsForm' && <StoreSettingsForm store={this.state.store} setShow={this.setShow} ></StoreSettingsForm>}
               {this.state.store && this.state.show == 'CreateProductForm' && <CreateProductForm store={this.state.store} setShow={this.setShow}></CreateProductForm>}
               {this.state.store && this.state.show == 'EditProduct' && <EditProduct product={this.state.productToEdit} setShow={this.setShow}></EditProduct>}
            </div>
            
            
        </div>
           
        </>
        )
    }

}

export default Account