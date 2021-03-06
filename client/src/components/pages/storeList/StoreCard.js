import React from 'react'
import { Link } from 'react-router-dom'

import Jumbotron from 'react-bootstrap/Jumbotron'


import './storeCard.css'

const StoreCard = ({_id, storeName, tagline, heroPicUrl}) => {
    return (
        <Link to={`./store/${_id}`} className="storeCard p-0 " >
        <Jumbotron fluid className="d-flex flex-column align-content-end storeCard px-0 mx-0" style={{backgroundImage: `url(${heroPicUrl})`}}>
            <div className="backdrop">
            <h4 className="pl-3 pt-2">{storeName}</h4>
            <p className="pl-3 pb-2 mb-0">{tagline}</p>
           </div>
        </Jumbotron>
        </Link>
        
    )
}

export default StoreCard

