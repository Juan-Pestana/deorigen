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
            uploadingImage: false
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

        this.setState({ uploadingImage: true })
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
                    uploadingImage: null
                })
            })

            .catch(err => console.log('Erroro!!', { err }))
    }

    heroPicUpload = e => {

        this.setState({ uploadingImage: true })
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
                    uploadingImage: null
                })
            })

            .catch(err => console.log('Erroro!!', { err }))
    }


    setLocation = location => {
        this.setState({location})
    }




    render() {

        return (

            <Form onSubmit={this.handleFormSubmit}>
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
                    <Form.Control type="textarea" name="description" value={this.state.store.description} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="textarea" name="address" value={this.state.store.address} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label> {this.state.uploadingImage ? <span><Spinner animation="border" variant="light"/></span> : "Foto Header"}</Form.Label>
                    <Form.Control type="file" name="heroPicUrl" onChange={this.heroPicUpload} className="btn btn-dark"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Foto Contenido</Form.Label>
                    <Form.Control type="file" name="imageUrl" onChange={this.contentPicUpload} className="btn"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Localización</Form.Label>
                    <LocationSearchInput setLocation ={this.setLocation}/>
                </Form.Group>


                <Button variant="dark" type="submit">Enviar Cambios</Button>
            </Form>
        )
    }
}

export default StoreSettingsForm