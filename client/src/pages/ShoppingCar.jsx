import React from 'react'
import {useState, useEffect} from 'react'


export default function ShoppingCart(){
    const [cakes, setCakes] = React.useState(null)

    useEffect(()=>{
        fetch('http://localhost:5000/cakes')
        .then((res) => res.json())
        .then((data) => setCakes(data))
        .catch(err => console.error(err))
    },[])

    return(
        <>
        
        <h1>Shopping Cart</h1>
        {cakes.toArray().map((cake) => {
           <div key = {cake.id}>
            <h3>{cake.name}</h3>
            <img src={cake.image} alt={cake.name} />
            <p>{cake.description}</p>
            <p>{cake.price} MXN</p>
           </div> 
        })}
        </>
    )
}

