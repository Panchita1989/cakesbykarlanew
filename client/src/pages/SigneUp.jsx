import FormWrapper from '../components/FormWrapper'
import formConfig from '../data/formData.js'
import '../styles/contact.css'
import {useNavigate} from 'react-router-dom'


export default function SigneUp (){
    const navigate = useNavigate()

    const handleSignup = async(e)=>{
        console.log('Login form submitted') 
        e.preventDefault()

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        console.log('Form data to send:', data);

        try {
            const res = await fetch('http://localhost:5000/user/signup',{
                method:'POST',
                //credentials:'include',
                headers: {
                    'content-type':'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await res.json()
            if(res.ok){
                navigate('/')
            }else{
                console.log(result.errors ||result.msg)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return(
        <FormWrapper handleSubmit={handleSignup} />
    )
}