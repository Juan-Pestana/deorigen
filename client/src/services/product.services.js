import axios from 'axios'

export default class ProductService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getAllProducts = () => this.api.get('/product/getAllProducts')
    getOneProduct = id => this.api.get(`/product/getOneProduct/${id}`)
    newProduct = product => this.api.post('/product/newProduct', product)
    updateProduct = (id, product) => this.api.put(`/product/editProduct/${id}`, product)
    deleteProduct = id => this.api.delete(`/product/deleteProduct/${id}`)
    getProductsFromStore = storeId => this.api.get(`/product/getProductsFromStore/${storeId}`) 

}