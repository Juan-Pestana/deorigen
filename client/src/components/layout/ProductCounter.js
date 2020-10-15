
import React, { Component } from 'react'


export default class ProductCounter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            counter : 0
        }
       

    }

    componentDidMount = () =>{
        var counter = setInterval(this.fetchProducts, 2000)
    }

    fetchProducts = () => {
        let number = 0
        let cartLocalStorage = JSON.parse(localStorage.getItem('deOrigenCart'))
        cartLocalStorage.forEach(elm =>  number += elm.quantity)
        this.setState({counter : number})
            
        
    }





    render() {
        return (
            <>
                {this.state.counter > 0 && <div className= 'counterContainer'>
                    <p className= 'counterNumber'>{this.state.counter}</p>
                </div>}
            </>
        )

        }

    }