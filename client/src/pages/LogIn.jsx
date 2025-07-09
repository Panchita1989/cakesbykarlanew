import FormWrapper from '../components/FormWrapper'
import formConfig from '../data/formData.js'
import '../styles/contact.css'
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate()

    const handleLogin= async(e)=>{
        e.preventDefault()

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        try {
            const res = await fetch('http://localhost:5000/user/login',{
                method: 'POST',
                //credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
            })
            const result = await res.json()
            if(res.ok){
                navigate('/')
            }else{
                console.log(result.errors ||result.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <FormWrapper handleSubmit={handleLogin} />
    )
}