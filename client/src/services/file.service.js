import axios from 'axios'

export default class fileService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }

    uploadImage = imageForm => this.api.post('/files/upload', imageForm)
}