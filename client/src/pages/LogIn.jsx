import FormWrapper from '../components/FormWrapper'
import '../styles/contact.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Login() {
    const navigate = useNavigate()
    const[error, setError] = useState([])

    const handleLogin= async(e)=>{
        e.preventDefault()

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        try {
            const res = await fetch('http://localhost:5000/user/login',{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
            })
            const result = await res.json()
            if(!res.ok){
                setError(result.errors || [{msg: result.msg ||'Something went wrong!'}])
            }else{
                setError([])
                navigate('/profile')
            }
        } catch (error) {
            setError([{msg: 'Server error. Please try again later.'}])
            console.log(error)
        }
    }

    return(
        <>{error.length > 0 &&(
            <ul className='error-list'>
                {error.map((error, index)=>
                    <li key={index}>{error.msg}</li>
                )}
            </ul>
        )}
          
            <FormWrapper handleSubmit={handleLogin} />
        </>
        
    )
}