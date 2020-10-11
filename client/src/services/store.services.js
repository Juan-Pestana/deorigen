import axios from 'axios'

export default class StoreService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    
    getOneStore = id => this.api.get(`/store/getOneStore/${id}`)
    newStore = (userId, store) => this.api.post(`/store/newStore/${userId}`, store)
    updateStore = (id, store) => this.api.put(`/store/editStore/${id}`, store)
    deleteStore = id => this.api.delete(`store/deleteStore/${id}`)
}