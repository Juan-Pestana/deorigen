import axios from 'axios'

export default class UserService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getAllUsers = () => this.api.get('/user/getAllUsers')
    getOneUser = id => this.api.get(`/user/getOneUser/${id}`)
    newUser = user => this.api.post('/user/newUser', user)
    updateUser = (id, user) => this.api.put(`/user/editUser/${id}`, user)
}