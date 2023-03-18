import React from 'react'
import { useParams } from 'react-router-dom'

const Payment = () =>
{
    const { id } = useParams();
    return (
        <div>
            <h2>Payment Successfully of amount Rs.{id}.00</h2>
        </div>
    )
}

export default Payment
