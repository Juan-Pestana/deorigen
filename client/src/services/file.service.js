import axios from 'axios'

export default class CoasterService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/files`,
            withCredentials: true
        })
    }

    uploadImage = imageForm => this.api.post('/upload', imageForm)
}