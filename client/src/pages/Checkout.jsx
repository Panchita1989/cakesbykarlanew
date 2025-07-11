import FormComponent from '../components/FormComponent'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const navigate = useNavigate()

    const handleCheckout = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

    try {
        const res = await fetch('http://localhost:5000/cake/checkout',{
            method:'GET',
            credentials: 'include',
            headers:{
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
            }
        })
        const result = await res.json()
    } catch (err) {
        console.console.error(err);
        
    }
    }
}