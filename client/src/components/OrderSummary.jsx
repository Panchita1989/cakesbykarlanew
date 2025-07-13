import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css"
import '../styles/orderSummary.css'


export default function OrderSummary(){
    const[cakes, setCakes] = useState([])
    const[startDate, setStartDate] = useState(new Date())
    

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
            <h3>Please choose a date for your Order to be picked up (at least 2 days before) and please take notice that the prepayment has to be done for us to confirm your order</h3>
            <section className='datePicker-wrapper'>
                <label htmlFor="">Choose your Pick up date</label>
                <DatePicker
                    selected={startDate}
                    onChange={(date => setStartDate(date)) }
                    dateFormat='dd.MM.yyyy'
                    minDate={addDays(new Date(), 2)}
                    
                />
            </section>
            <section className='payment'>
                <p>Please pay 50% to confirm order</p>
                <p>Prepayment: ${(totalPriceOrder * 0.5)}</p>
                <p>Payment for Banktransfer or in the Restaurant Tigre Pétanque Bacalar</p>
            </section>
        </div>
    )
}
