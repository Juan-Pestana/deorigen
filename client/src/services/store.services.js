import axios from 'axios'

export default class StoreService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    
    getOneStore = id => this.api.get(`/store/getOneStore/${id}`)
    newStore = order => this.api.post('/store/newStore', order)
    updateStore = (id, store) => this.api.put(`/store/editStore/${id}`, store)
}