
export default function OrderSummary({cakes}){
    if(!cakes.length){
        return <p>No order found</p>
    }
    const getTotalPrice = (cake) => cake.price * cake.quantity
    const totalPriceOrder = cakes.reduce((acc, c) => acc + getTotalPrice(c), 0)

    return(
        <div className='order-summary'>
            <h2>Your Order</h2>
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
