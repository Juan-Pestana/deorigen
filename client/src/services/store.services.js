import axios from 'axios'

export default class StoreService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    
    getOneStore = id => this.api.get(`/store/getOneOrder/${id}`)
    newStore = order => this.api.post('/store/newOrder', order)
    updateStore = (id, store) => this.api.put(`/store/editOrder/${id}`, store)
}