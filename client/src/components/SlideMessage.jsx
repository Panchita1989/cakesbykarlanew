import { useState, useEffect } from "react";
import React from 'react'
import '../styles/ChooseYourCake.css'

export default function SlideMessage(){
    const[showMessage, setShowMessage] = useState(true)
    const message = ' 🎂 Cake has been added to your cart!'

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(false)
        }, 3000);
       
        return() => clearTimeout(timer)
    },[])
    if(!showMessage){
        return null
    }
    return(
        <div className='slide-message'>{message}</div>
    )
    
}