import { useEffect, useState } from 'react';

export default function OrderSummary(){
    const[cakes, setCakes] = useState([])

     useEffect(() => {
        const guestId = localStorage.getItem('guestId');
        const url = guestId
            ? `http://localhost:5000/cakes?guestId=${guestId}`
            : 'http://localhost:5000/cakes';

        fetch(url, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setCakes(data))
            .catch(err => console.error(err));
    }, []);

    if(!cakes.length){
        return <p>No order found</p>
    }
    const getTotalPrice = (cake) => cake.price * cake.quantity
    const totalPriceOrder = cakes.reduce((acc, c) => acc + getTotalPrice(c), 0)

    return(
        <div className='order-summary'>
            <h2>Your Order Summary 🍰</h2>
            <ul>
                {cakes.map(cake =>{
                    <li key={cake._id}>
                        {cake.name} - {cake.quantity} * {cake.price} = ${getTotalPrice(cake)}
                    </li>
                })}
            </ul>
            <h3>Total: ${totalPriceOrder}</h3>
            <p>Please pay 50% to confirm order</p>
            <p>Prepayment: ${(totalPriceOrder * 0.5)}</p>
            <p>Payment for Banktransfer or in the Restaurant Tigre Pétanque Bacalar</p>
        </div>
    )
}
