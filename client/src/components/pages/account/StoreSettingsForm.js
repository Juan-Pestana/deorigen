import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import LocationSearchInput from './LocationSearchInput'

import storeService from '../../../services/store.services'
import filesService from '../../../services/file.service'


class StoreSettingsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            storeName: '',
            tagline: '',
            description: '',
            address: '',
            heroPicUrl: '',
            contentPicUrl: '',
            location: ''

        }
        this.storeService = new storeService()
        this.filesService = new filesService()
    }


    componentDidMount = () => this.setStore()

    setStore = () => {
        this.setState ({...this.props.store})

    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()

        this.storeService
            .updateStore(this.props.store._id, this.state)
            .then(() => this.props.setShow('StoreSettings'))
            .catch(err => console.log('Erroro!!', { err }))
    }

    contentPicUpload = e => {

        // const picUrl = e.target.name
        const uploadData = new FormData()
        uploadData.append( 'imageUrl', e.target.files[0])

        console.log(uploadData)
        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                console.log(response)
                this.setState({ contentPicUrl : response.data.secure_url})
            })

            .catch(err => console.log('Erroro!!', { err }))
    }

    heroPicUpload = e => {

        // const picUrl = e.target.name
        const uploadData = new FormData()
        uploadData.append( 'imageUrl', e.target.files[0])

        console.log(uploadData)
        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                console.log(response)
                this.setState({ heroPicUrl : response.data.secure_url})
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
                    <Form.Control type="text" name="storeName" value={this.state.storeName} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Presentación</Form.Label>
                    <Form.Control type="text" name="tagline" value={this.state.tagline} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="textarea" name="description" value={this.state.description} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Foto Header</Form.Label>
                    <Form.Control type="file" name="heroPicUrl" onChange={this.heroPicUpload} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Foto Contenido</Form.Label>
                    <Form.Control type="file" name="imageUrl" onChange={this.contentPicUpload} />
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