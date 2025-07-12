import React from 'react'
import '../styles/formWrapper.css'
import '../styles/Contact.css'
import OrderSummary from './OrderSummary'
import formConfig from "../data/formData.js";
import {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import FormComponent from './FormComponent'
import handleSendOrder from '../logic/handleSendOrder'


export default function FormWrapper({formType, prefillData}){

    const location = useLocation()
    const [cakes, setCakes] = useState([])
    const [startDate, setStartDate] = useState(new Date());


    useEffect(()=>{
        if(formType === 'checkout'){
            fetch('http://localhost:5000/cakes',{
                credentials: 'include'
            })
            .then(res => res.json())
            .then(data => setCakes(data))
            .catch(err => console.error(err))
        }
    },[formType])

    const [activeForm, setActiveForm] = useState(formType)
    const [imagePosition, setImagePosition] = useState('right')
    const [direction, setDirection] = useState('none')

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

    const image = formConfig[activeForm]?.image ?? null

    if(!formConfig[activeForm]){
        return <div>Form not found</div>
    }

  return (
  <div className="formWrapper">
    {image ? (
      imagePosition === 'right' ? (
        <>
          <div className={`formSection ${direction}`}>
            {activeForm === 'checkout' && 
            <OrderSummary 
              cakes={cakes}
              startDate={startDate}
              setStartDate={setStartDate} />}
            <FormComponent 
              formType={activeForm}
              prefillData={prefillData}
              startDate={startDate}
              onSendOrder={
                activeForm === 'checkout'
                  ? (formData, setError, navigate) =>
                      handleSendOrder(formData, setError, navigate, cakes, startDate)
                  : undefined
              }
            />
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
            <FormComponent 
              formType={activeForm} 
              prefillData={prefillData}
              startDate={startDate}
              onSendOrder={
                activeForm === 'checkout'
                  ? (formData, setError, navigate) =>
                      handleSendOrder(formData, setError, navigate, cakes, startDate)
                  : undefined
              }
            />
          </div>
        </>
      )
    ) : (
      <div className="formSection full">
        {activeForm === 'checkout' && <OrderSummary cakes={cakes} />}
        <FormComponent
          formType={activeForm}
          prefillData={prefillData}
          startDate={startDate}
          onSendOrder={
            activeForm === 'checkout'
              ? (formData, setError, navigate) =>
                  handleSendOrder(formData, setError, navigate, cakes,startDate)
              : undefined
          }
        />
      </div>
    )}
  </div>
)



}


