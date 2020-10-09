import React from 'react'


import Card from 'react-bootstrap/Card'

const PayPersonalCard = ({ firstName, lastName, phone, address}) => {

    return (
        <Card>
            <Card.Header>Tus datos</Card.Header>
                <Card.Body>
               <p>{firstName} {lastName} - tel: {phone}</p>
                <p>{address}</p> 
                </Card.Body>
        </Card>
       
    ) 
}

export default PayPersonalCard