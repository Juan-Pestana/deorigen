import axios from 'axios'

export default class OrderService {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    getAllOrders = () => this.api.get('/order/getAllOrders')
    getOneOrder = id => this.api.get(`/order/getOneOrder/${id}`)
    newOrder = order => this.api.post('order/newOrder', order)
    updateOrder = (id, order) => this.api.put(`order/editOrder/${id}`, order)
}