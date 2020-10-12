import React, {Component} from 'react'

import storeService from '../../../services/store.services'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Cart from './../cart/Cart'
import PersonalInfo from './../account/PersonalInfo'
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
        <Row className="d-none d-md-block">
            <nav className = 'col d-flex pt-5 bg-light align-items-center'> 
                    <div className='nav-link p-3' onClick={() => this.setShow('Cart')}>Listado de productos</div>    
                    <div className='nav-link p-3' onClick={() => this.setShow('PersonalInfo')}>Información Personal</div>
                    <div className='nav-link p-3' onClick={() => this.setShow('PaymentInfoForm')}>Información de pago</div>
           </nav>
        </Row>    
        <Row>
            <div className = 'col d-flex mt-5'> 
                
                {this.state.show == 'Cart' && <Cart user={this.props.loggedInUser} {...this.props} setShow={this.setShow} closing={true}></Cart>}   
                {this.state.show == 'PersonalInfo' && <PersonalInfo user={this.props.loggedInUser} {...this.props}  setShow={this.setShow} closing={true}></PersonalInfo>}   
                {this.state.show == 'PaymentInfoForm' && <PaymentInfoForm {...this.props} setShow={this.setShow}></PaymentInfoForm>} 
            </div>
        </Row>    
            
        
           
        </Container>
        )
    }

}

export default Order