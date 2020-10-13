import React, {Component} from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import storeService from './../../../services/store.services'
import productService from './../../../services/product.services'
import ProductCard from './../shop/productCard'
import MapContainer from './../../shared/MapContainer'



class StoreSettings extends Component {

    constructor() {
       super()
       this.state = {
           store : {},
          

       }
       this.storeService = new storeService()
       this.productService= new productService()
   }

   componentDidMount = () => this.setStoreFromDB()

   setStoreFromDB = () => {
            this.storeService
            .getOneStore(this.props.user.store)
            .then(response => this.setState({store: response.data}))
            .catch(err => console.log('Error:', err))

   }

  

   deleteProduct = id => {
        const update = this.state.store.products
        update.splice(update.indexOf(id), 1)

       this.productService
            .deleteProduct(id)
            .then(this.setState({
                store: {...this.state.store, products: update}
            }))
            .catch(err => console.log('Error:', err))


   }

    


   render (){
      
    console.log(this.props)
    

    return(
        <Container>
        <h1>Tu Tienda</h1>
        <div >
            <button onClick={()=>this.props.setShow('StoreSettingsForm')} className='btn btn-outline-secondary btn-sm float-right mr-3'>Editar</button>
    
            <label className = 'text-muted'>Nombre de la tienda</label>
            <p>{this.state.store.storeName}</p>
            <hr className='mb-2'/>
            <label className = 'text-muted'>Presentación</label>
            <p>{this.state.store.tagline}</p>
            <hr className='mb-2'/>
            <label className = 'text-muted'>Descripción</label>
            <p>{this.state.store.description}</p>
            <hr className='mb-2'/>
            <div className='d-flex justify-content-around'>
                <div>
                    <p className = 'text-muted'>Foto Header</p>
                    <img className= 'heroPic'src={this.state.store.heroPicUrl}/>
                </div>
                <div>
                    <p className = 'text-muted'>Foto Contenido</p>
                    <img className= 'heroPic'src={this.state.store.contentPicUrl}/>
                </div>
                
            </div>
            
            <hr className='mb-2'/>
            <label className = 'text-muted'>Dirección</label>
            <p>{this.state.store.address}</p>
            <hr className='mb-2'/>
            <label className = 'text-muted'>Teléfono</label>
            <p>{this.props.user.phone}</p>
            <hr className='mb-2'/>
        </div>
        <div className='mt-5'>
            <h2>Tus Productos a la venta</h2>
            <hr></hr>
            <button onClick={()=>this.props.setShow('CreateProductForm')} className='btn btn-outline-secondary btn-sm float-right mr-3'>Crear Producto</button>
            <Container className='storeProducts'>
                <div className= 'row'>
             
                {this.state.store.products && this.state.store.products.map(elm=><div className='col-sm-6 col-md-4' key = {elm._id}><ProductCard  {...elm} />
                    <div className='btn-group d-flex justify-content-center mr-3'>
                        <button onClick={()=> this.deleteProduct(elm._id)}  className='btn btn-outline-dark btn-sm'>eliminar</button>
                        <button onClick={()=> this.props.productToEdit(elm._id)} className='btn btn-dark btn-sm'>editar</button>
                    </div>
                </div>)}
                  
            
            </div>
            </Container>

        </div>
        
        <div className="turnThePhone">

            <h4>
                Recomendamos acceder a esta sección desde un ordenador. Si no resulta posible por favor utiliza el dispositivo en horizontal
            </h4>
           

        </div>       
        </Container>
    )

   }

}

export default StoreSettings