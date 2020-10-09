import React, {Component} from 'react'

import storeService from './../../../services/store.services'
import ProductCard from './../shop/productCard'


class StoreSettings extends Component {

    constructor() {
       super()
       this.state = {
           store : {},
          

       }
       this.storeService = new storeService()
   }

   componentDidMount = () => this.setStoreFromDB()

   setStoreFromDB = () => {
            this.storeService
            .getOneStore(this.props.user.store)
            .then(response => this.setState({store: response.data}))
            .catch(err => console.log('Error:', err))

   }

    


   render (){
       console.log(this.state.store)
    

    return(
        <>
        <div className='container ml-4'>
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
            <button className='btn btn-outline-secondary btn-sm float-right mr-3'>Crear Producto</button>
            <div className='container'>
                <div className= 'row storeProducts'>
                {this.state.store.products && this.state.store.products.map(elm=><ProductCard key = {elm._id} {...elm} />)}
                  
            
            </div>
            </div>
        </div>

        
        </>
    )

   }

}

export default StoreSettings