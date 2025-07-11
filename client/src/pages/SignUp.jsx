import FormWrapper from '../components/FormWrapper.jsx'
import formConfig from '../data/formData.js'
import '../styles/contact.css'
import {useNavigate} from 'react-router-dom'
import { useState } from "react";


export default function SignUp (){
    const navigate = useNavigate()
    const[error, setError] = useState([])

    const handleSignup = async(e)=>{
        console.log('Login form submitted') 
        e.preventDefault()

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        console.log('Form data to send:', data);

        try {
            const res = await fetch('http://localhost:5000/user/signup',{
                method:'POST',
                credentials:'include',
                headers: {
                    'content-type':'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await res.json()
            if(!res.ok){
                setError(result.errors || [{msg: result.msg || 'Something went wrong, please try later again.'}])
            }else{
                navigate('/')
                setError([])
            }
        } catch (error) {
            console.error(error)
        }
    }
    return(
        <>{error.length > 0 && (
            <ul>
                {error.map((error, index) =>
                    <li key={index}>{error.msg}</li>
                )}
            </ul>
            )}
            <FormWrapper handleSubmit={handleSignup} />
        </>
        
    )
}