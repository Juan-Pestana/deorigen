import React, {Component} from 'react'

import storeService from '../../../services/store.services'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


import Cart from './../cart/Cart'
import PersonalInfo from './../account/PersonalInfo'
import PersonalInfoForm from './../account/PersonalInfoForm'
import PaymentInfoForm from './PaymentInfoForm'

import './order.css'

class Order extends Component {
    constructor(props){
        super(props)
        this.state ={
            user : null,
            store: null,
            show: 'Cart'

        }
        this.storeService = new storeService()
    }

    componentDidMount = () => this.setUser()


    setUser = () => this.setState({user : this.props.loggedInUser})

 

    setShow = (pageShow) => {
        console.log('cambia a ', pageShow)
        this.setState({show : pageShow})}


    render(){

        return(

        <Container className="page px-0 px-md-3">
        <Row className="d-none d-md-block ">
            <nav className = 'col d-flex pt-5 bg-light align-items-center justify-content-around '> 
                    <div className='nav-link p-3 orderSelect' onClick={() => this.setShow('Cart')}>Listado de productos</div>    
                    <div className='nav-link p-3 orderSelect' onClick={() => this.setShow('PersonalInfo')}>Información Personal</div>
                    <div className='nav-link p-3 orderSelect' onClick={() => this.setShow('PaymentInfoForm')}>Información de pago</div>
           </nav>
        </Row>    
        <Row>
            <div className = 'col d-flex mt-5 flex-column'> 
                
                {this.state.show === 'Cart' && <Cart user={this.props.loggedInUser} {...this.props} setShow={this.setShow} closing={true}></Cart>}   
                {this.state.show === 'PersonalInfo' && <PersonalInfo user={this.props.loggedInUser} {...this.props} setShow={this.setShow} closing={true}></PersonalInfo>}  
                {this.state.show === 'PersonalInfoForm' && <PersonalInfoForm user={this.props.loggedInUser} {...this.props}  setShow={this.setShow} closing={true}></PersonalInfoForm>}         
                {this.state.show === 'PaymentInfoForm' && <PaymentInfoForm  loggedInUser={this.state.loggedInUser} {...this.props} setShow={this.setShow}></PaymentInfoForm>} 
            </div>
        </Row>    
            
        
           
        </Container>
        )
    }

}

export default Order