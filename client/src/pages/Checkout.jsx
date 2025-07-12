import { useState, useEffect } from "react";
import React from 'react'
import formConfig from '../data/formData'
import { useLocation } from "react-router-dom";

export default function Checkout(){
    const [cakes, setCakes] = React.useState([])
    const location = useLocation()
    const path = location.pathname
    const currentForm = formConfig[path]
    useEffect(()=>{
        async function fetchCakes() {
            try {
               const res = await fetch('http://localhost:5000/cakes', {
                credentials: 'include'
               })
               const data = await res.json()   
               setCakes(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchCakes()
    },[])

    function getTotalPrice(cake) {
        return cake.price * cake.quantity
    }
    const totalPriceOrder = cakes.reduce((acc, c) => acc + getTotalPrice(c),0 )

    return(
        <>
            <h1>Your Total Order is:</h1>
            <ul>{cakes.map(cake =>{
                <li key={cake._id}>{cake.name}
                <span>{getTotalPrice}</span>
                </li>
            })}
            </ul>
            <h3>Total Price of your order: {totalPriceOrder}</h3>
            <form >
                {currentForm.fields.map((field)=>{
                if(field.type === 'textarea') {
                    return (  
                        <textarea        
                            key={field.id}
                            name= {field.name}
                            type= {field.type}
                            rows = {field.rows}
                            required = {field.required}
                        />                        
                )} else if(field.type === 'submit'){
                    return(
                        <button
                            key={field.id}
                            name={field.name}
                            type={field.type}                            >
                            {field.content}
                        </button>                        
                )} else{
                    return(
                        <input
                            key={field.id}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            required={field.required}
                            defaultValue={prefillData?.[field.name]||''}
                        />
                     ) }
                })} 
            
            </form>
        </>
    )
}
