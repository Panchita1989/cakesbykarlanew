import React from 'react'
import {useState, useEffect} from 'react'
import '../styles/ShoppingCar.css'


export default function ShoppingCart(){
    const [cakes, setCakes] = React.useState([])

    useEffect(()=>{
        fetch('http://localhost:5000/cakes', {
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            const dataWithQuantity = data.map(cake => ({
                ...cake, 
                quantity: cake.quantity || 1
            }))
            console.log('loaded cakes:', data)
            setCakes(dataWithQuantity)
        })
        .catch(err => console.error(err))
    },[])

    function increaseQuantity(id) {
        setCakes(prevCakes => {
            prevCakes.map(cake => {
                if(cake._id === id){
                    return{
                        ...cake,
                        quantity: cake.quantity + 1
                    }
                }
                return cake
            })
        })
    }
    function decreaseQuantity(id) {
        setCakes(prevCakes =>
            prevCakes.map(cake =>{
                if(cake._id === id && cake.quantity > 1){
                    return{
                        ...cake,
                        quantity: cake.quantity - 1
                    }
                }
                return cake
            })
        )
    }
    function getTotalPrice(cake) {
        return cake.price * cake.quantity
    }
    const totalPriceOrder = cakes.reduce((acc, c) => acc + getTotalPrice(c),0 )

    async function handleDelete(cakeId) {
        try {
            const res = await fetch(`http://localhost:5000/cake/delete/${cakeId}`,{
                method:'DELETE',
                credentials: 'include'
            })

            if(!res.ok){
                throw new Error("Deleting not possible");                
            }
            const data = await res.json()
            console.log(data)

            setCakes(prevCakes => prevCakes.filter(cake => cake._id !== cakeId))

        } catch (error) {
            console.error(error)
        }
    }

    return(
        <>
        <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-xl font-bold mb-6">Your Cart 🛒</h1>    
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {cakes.map((cake) => (
            <article key={cake._id} className= 'bg-white border rounded-lg shadow-lg overflow-hidden'>
                <img 
                    src={cake.image} 
                    alt={cake.name}
                    className='w-full h-48 object-cover'
                />
                <div className='p-4'>
                    <h2 className="text-xl font-semibold text-gray-800">{cake.name}</h2>
                    <p className="mt-2 text-gray-600">{cake.description}</p>
                    <p className="mt-4 text-lg font-medium text-gray-900">Price: {cake.price} MXN</p>     
                        <span
                            onClick={() => decreaseQuantity(cake._id)}
                            className="bg-gray-300 px-2 rounded"
                        > - </span>
                        <span>{cake.quantity}</span>
                        <span
                            onClick={() => increaseQuantity(cake._id)}
                            className="bg-gray-300 px-2 rounded"
                        > + </span>
                    <p className="mt-2 font-semibold">
                        Total Price: {getTotalPrice(cake)} MXN
                    </p>
                    <button className='delete'
                            onClick={() => handleDelete(cake._id)}>
                       🗑️ Delete
                    </button>
                    </div>               
            </article>
        ))}
        </div>
        </div>
        <div className='totalOrder'>
            <span>Your total order is: ${totalPriceOrder} MXN</span>
            <span>Click Checkout to finish your order</span>
        </div>
        <button>✅ Checkout </button>
        <button>🗑️ Delete all</button>
        </>
    )
}

