import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import LocationSearchInput from './LocationSearchInput'
import Spinner from 'react-bootstrap/Spinner'

import storeService from '../../../services/store.services'
import filesService from '../../../services/file.service'


class StoreSettingsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            store: {
                _id: "",
                storeName: '',
                tagline: '',
                description: '',
                address: '',
                heroPicUrl: '',
                contentPicUrl: '',
                location: ''
            },
            uploadingImageH: false,
            uploadingImageC: false
        }
        this.storeService = new storeService()
        this.filesService = new filesService()
    }

    componentDidMount = () => this.setStore()

    setStore = () => {
        if(this.props.adminUpdate){
            this.storeService
                .getOneStore(this.props.storeToEdit)
                .then(response => this.setState({ store: { ...response.data } }))
        }else{
            this.setState({ store: { ...this.props.store } })
        }
        

    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ store: { ...this.state.store, [name]: value } })
    }

    handleFormSubmit = e => {
        e.preventDefault()

        this.storeService
            .updateStore(this.state.store._id, this.state.store)
            .then(() => this.props.adminUpdate ? this.props.setShow('AllStores') : this.props.setShow('StoreSettings'))
            .catch(err => console.log('Erroro!!', { err }))
    }

    contentPicUpload = e => {

        this.setState({ uploadingImageC: true })
        // const picUrl = e.target.name
        const uploadData = new FormData()
        uploadData.append( 'imageUrl', e.target.files[0])

        console.log(uploadData)
        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                console.log(response)
                this.setState({
                    store: { ...this.state.store, contentPicUrl: response.data.secure_url },
                    uploadingImageC: null
                })
            })

            .catch(err => console.log('Erroro!!', { err }))
    }

    heroPicUpload = e => {

        this.setState({ uploadingImageH: true })
        // const picUrl = e.target.name
        const uploadData = new FormData()
        uploadData.append( 'imageUrl', e.target.files[0])

        console.log(uploadData)
        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                console.log(response)
                this.setState({
                    store: { ...this.state.store, heroPicUrl: response.data.secure_url },
                    uploadingImageH: null
                })
            })

            .catch(err => console.log('Erroro!!', { err }))
    }


    setLocation = location => {
        this.setState({location})
    }




    render() {

        return (

            <Form onSubmit={this.handleFormSubmit} className='pt-4'>
                <Form.Group>
                    <Form.Label>Nombre de la tienda</Form.Label>
                    <Form.Control type="text" name="storeName" value={this.state.store.storeName} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Presentación</Form.Label>
                    <Form.Control type="text" name="tagline" value={this.state.store.tagline} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" rows='3' name="description" value={this.state.store.description} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="textarea" name="address" value={this.state.store.address} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Foto Cabecera{this.state.uploadingImageH &&<Spinner animation="border" size="sm" variant="light" /> } </Form.Label>
                    <Form.Control type="file" name="heroPicUrl" onChange={this.heroPicUpload} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Foto Contenido{this.state.uploadingImageC &&<Spinner animation="border" size="sm" variant="light" /> }</Form.Label>
                    <Form.Control type="file" name="imageUrl" onChange={this.contentPicUpload} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Localización</Form.Label>
                    <LocationSearchInput setLocation ={this.setLocation}/>
                </Form.Group>


                <Button variant="dark" type="submit" disabled={this.state.uploadingImageH || this.state.uploadingImageC}>
                    {this.state.uploadingImageH || this.state.uploadingImageC ? 'Subiendo...' : 'Editar Tienda'}</Button>
            </Form>
        )
    }
}

export default StoreSettingsForm