import React, {Component} from 'react'

import storeService from './../../../services/store.services'

import PersonalInfo from './PersonalInfo'
import PersonalInfoForm from './PersonalInfoForm'

import './account.css'

class Account extends Component {
    constructor(props){
        super(props)
        this.state ={
            user : null,
            store: null,
            show: 'PersonalInfo'

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
        this.setState({show : pageShow})}


    render(){

        return(

        <>
        <div className = 'row accountPage'>
            <div className = 'col-3 d-flex flex-column pt-5 bg-light align-items-center'> 
                    <div className='nav-link p-3'>Información Personal</div>
                    <div className='nav-link p-3'>Ultimos Pedidos</div>


            </div>
            <div className = 'col-9 d-flex mt-5'> 

               {this.state.show == 'PersonalInfo' && <PersonalInfo user={this.props.loggedInUser} setShow={this.setShow}></PersonalInfo>}   
               {this.state.show == 'PersonalInfoForm' && <PersonalInfoForm user={this.props.loggedInUser} setShow={this.setShow}></PersonalInfoForm>} 
            </div>
            
            
        </div>
           
        </>
        )
    }

}

export default Account