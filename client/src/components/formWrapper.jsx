import React from 'react'
import '../styles/formWrapper.css'
import '../styles/Contact.css'
import formConfig from "../data/formData.js";
import {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import FormComponent from './FormComponent'


export default function FormWrapper({formType, prefillData}){

    const location = useLocation()
    const [activeForm, setActiveForm] = useState(formType)
    const [imagePosition, setImagePosition] = useState('right')
    const [direction, setDirection] = useState('none')

    const getInitialForm = () => {
        if(location.pathname.includes('login')) return 'login'
        if(location.pathname.includes('signup')) return 'signup'
        if(location.pathname.includes('checkout')) return 'checkout'
        return 'contact'
    }

    useEffect(()=> {
        const path = location.pathname
        const newForm = path.includes('login') 
        ? 'login'
        : path.includes('contact')
        ? 'contact'
        : path.includes('signup')
        ? 'signup'
        : 'checkout'

        //when my from url changes     
        
        if(activeForm !== newForm){
            setDirection(prev =>(prev === 'right' ? 'left' : 'right'))
            setImagePosition(prev =>(prev === 'right' ? 'left' : 'right'))
            setActiveForm(newForm)          
        }
    }, [location.pathname])

    const image = formConfig[activeForm]?.image

    if(!formConfig[activeForm]){
        return <div>Form not found</div>
    }

    return(
        <div className='formWrapper'>
            {imagePosition === 'right' ? (
                <>
                    <div className={`formSection ${direction}`}>
                        <FormComponent formType={activeForm} prefillData={prefillData}/>
                    </div>
                    <div className={`imageSection ${direction}`}>
                        <img src={image.src} alt={image.alt} />
                    </div>
                </>
            ) : (
                <>
                    <div className={`imageSection ${direction}`}>
                        <img src={image.src} alt={image.alt} />
                    </div>
                    <div className={`formSection ${direction}`}>
                        <FormComponent formType={activeForm} prefillData={prefillData}/>
                    </div>
                </>        
            )}
        </div>
    )
}


