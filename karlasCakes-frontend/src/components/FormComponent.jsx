import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../styles/contact.css'
import formData from '../data/formData'
import handleLogin from '../logic/handleLogin'
import handleSignup from '../logic/handleSignup'
import handleSendOrder from '../logic/handleSendOrder'
import handleSendMessage from '../logic/handleSendMessage'

export default function FormComponent({formType, prefillData, startDate, setCakes, onSendOrder}) {
    const[error, setError]= useState([])
    const navigate = useNavigate()

    const currentForm = formData[formType]

    if(!currentForm){
        return <div>Form not found</div>
    }    

    const submitHandlers = {
        login: handleLogin, 
        signup: handleSignup,
        checkout: handleSendOrder,
        contact: handleSendMessage
    }
    
    

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const handler = submitHandlers[formType]

        if(formType === 'checkout'){
            await onSendOrder(formData, setError, navigate, setCakes, startDate)
            return
        }

        if(handler){
           await handler(formData, setError, navigate)
        }else{
            console.warn('No handler for this Formtype:', formType)
        }
    }                                                                                                        // to have access to the current form we use the method .find() which goes to our formData and checks which form has the same name as our formType from FormPag

    return(                                                                             
            <div className='wrapperForm'>
                <h2>{currentForm.title}</h2>

                <Link to={currentForm.linkTo} className='login' >{currentForm.option}</Link>

                {error.length > 0 && (
                    <ul className='error-list'>
                        {error.map((err, i)=> (
                            <li key={i}>{err.msg}</li>
                        ))}
                    </ul>
                )}

                <form onSubmit={handleSubmit}>
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
            </div>                 
    )
}