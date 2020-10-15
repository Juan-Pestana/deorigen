import React, {Component} from 'react'


import Row from 'react-bootstrap/Row'

import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Container from 'react-bootstrap/Container'


import OrderService from '../../../services/order.services'




class AllOrders extends Component {

    constructor() {
       super()
       this.state = {
           orders : [],
           sorted : []


       }
       this.orderService = new OrderService()
   }

   componentDidMount = () => {
    this.setAllOrders()

}

    setAllOrders = () => {
    this.orderService
            .getOrdersFromUser(this.props.user._id)
            .then(response => {
    
                this.setState({orders : response.data},() => this.sortByDate())})
            .catch(err => console.log('Error:', err))

    }

    sortByDate = () => {
        let toSort = [...this.state.orders]
        toSort.sort((a, b) => a.createdAt > b.createdAt)
        this.setState({sorted : toSort})
    }

    sortByAmount = () => {
        let toSort = [...this.state.orders]
        toSort.sort((a, b) => a.subtotal > b.subtotal)
        this.setState({sorted : toSort})
    }



 






   render(){
       console.log(this.props)

    return(
        <>
        <Container className='pt-3'>
         <Row className='mb-4'>
            <ButtonGroup>
                <Button onClick ={()=>this.sortByDate()}>Por fecha</Button>
                <Button className='btn-outline' onClick ={()=>this.sortByAmount()}>Por Importe</Button>
            </ButtonGroup>
             
         </Row>
        
        
      {(this.state.sorted ? this.state.sorted : this.state.orders)
                      
                        .map(elem =><div key={elem._id} className='row'>
                <div className=' col-sm-6 col-md-4'>
                    <label className='text-muted'>Fecha</label>
                    <p>{elem.dateString}</p>
                </div>
                <div className=' col-sm-6 col-md-3'>
                    <label className='text-muted'>Importe Total</label>
                    <p>{elem.subtotal}€</p>
                </div>
                <div className=' col-sm-12 col-md-5'>
                    <label className='text-muted'>Numero de Productos</label>
                    <p>{elem.productList.length}</p>
               
                    
                </div>
            </div>)}


        </Container>
        
        </>
    )
   }

}


export default AllOrders