import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import LocationSearchInput from './LocationSearchInput'

import productService from '../../../services/product.services'
import storeService from '../../../services/store.services'
import filesService from '../../../services/file.service'


class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {

                productName: '',
                format: '',
                price: '',
                category: '',

                productPicUrl: ''
            
            

        }

        this.filesService = new filesService()
        this.productService = new productService()
    }


    componentDidMount = () => this.setProduct()

    setProduct = () => {
            console.log('este es el id', this.props.product)
        this.productService
            .getOneProduct(this.props.product)
            .then(response => this.setState({...response.data}))
            .catch(err => console.log('Erroro!!', { err }))

    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()

        this.productService
            .updateProduct(this.props.product, this.state)
            .then(() => this.props.setShow('StoreSettings'))

            .catch(err => console.log('Erroro!!', { err }))
    }

    productPicUpload = e => {

        // const picUrl = e.target.name
        const uploadData = new FormData()
        uploadData.append( 'imageUrl', e.target.files[0])

        console.log(uploadData)
        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                console.log(response)
                this.setState({ 
                    product: {...this.state.product, productPicUrl : response.data.secure_url}
                })
            })

            .catch(err => console.log('Erroro!!', { err }))
    }






    render() {

        return (
            <>
            <h1>Edita el producto {this.state.productName}</h1>
            <Form onSubmit={this.handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Nombre del Producto</Form.Label>
                    <Form.Control type="text" name="productName" value={this.state.productName} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Formato</Form.Label>
                    <Form.Control type="text" name="format" value={this.state.format} onChange={this.handleInputChange} />
                    <small className='text-muted'>x.ej: 250gr</small>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" name="price" value={this.state.price} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Categoría</Form.Label>
                    <Form.Control as="select" name="category" value={this.state.category} onChange={this.handleInputChange}>
                        <option value="meat">Carne</option>
                        <option value="fish">Pescado</option>
                        <option value="dairy">Lacteos</option>
                        <option value="wine">Vino</option>
                        <option value="veggies">Vegetales</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Imagen del producto</Form.Label>
                    <Form.Control type="file" name="imageUrl" onChange={this.productPicUpload} />
                </Form.Group>



                <Button variant="dark" type="submit">Enviar Cambios</Button>
            </Form>

            </>

            
        )
    }
}

export default EditProduct