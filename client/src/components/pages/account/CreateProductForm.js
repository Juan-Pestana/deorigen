import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


import productService from '../../../services/product.services'
import storeService from '../../../services/store.services'
import filesService from '../../../services/file.service'


class CreateProductForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {
                productName: '',
                format: '',
                price: '',
                category: '',
                store: this.props.store._id,
                productPicUrl: 'https://www.tibs.org.tw/images/default.jpg'
            },
            store: {}
            

        }
        this.storeService = new storeService()
        this.filesService = new filesService()
        this.productService = new productService()
    }


    componentDidMount = () => this.setStore()

    setStore = () => {
        this.setState ({store: {...this.props.store}})

    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ product: { ...this.state.product, [name]: value } })
    }

    handleFormSubmit = e => {
        e.preventDefault()

        this.productService
            .newProduct(this.state.product)
            .then(response =>{
                this.state.store.products.push(response.data._id)    
                this.storeService
                    .updateStore(this.state.store._id, this.state.store)     
            } )
            .then(() => this.props.setShow('StoreSettings'))
            .catch(err => console.log('Error!!', { err }))
    }

    productPicUpload = e => {

        // const picUrl = e.target.name
        const uploadData = new FormData()
        uploadData.append( 'imageUrl', e.target.files[0])

       
        this.filesService
            .uploadImage(uploadData)
            .then(response => {
               
                this.setState({ 
                    product: {...this.state.product, productPicUrl : response.data.secure_url}
                })
            })

            .catch(err => console.log('Erroro!!', { err }))
    }






    render() {

        return (
            <>
             <Container>
                <Row>
                <Col md={4} lg={3} className='m-auto'>
                <Card className="product-card">
                    <Card.Img variant="top" src={this.state.product.productPicUrl} />
                    <Card.Body>
                        <h6>{this.state.product.productName}</h6>
                        <p className="format">{this.state.product.format} <br></br>
                        <span className="price">{this.state.product.price} €</span> /ud.</p>
                        
                    </Card.Body>
                </Card>
            </Col>
                
                </Row>
            </Container>
            

            <Form onSubmit={this.handleFormSubmit} className= 'mt-5'>
                <Form.Group>
                    <Form.Label>Nombre del Producto</Form.Label>
                    <Form.Control type="text" name="productName" value={this.state.product.productName} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Formato</Form.Label>
                    <Form.Control type="text" name="format" value={this.state.product.format} onChange={this.handleInputChange} />
                    <small className='text-muted'>x.ej: 250gr</small>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" name="price" value={this.state.product.price} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Categoría</Form.Label>
                    <Form.Control as="select" name="category" value={this.state.product.category} onChange={this.handleInputChange}>
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

export default CreateProductForm