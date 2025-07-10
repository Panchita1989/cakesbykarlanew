import React from 'react'
import { useEffect } from "react";
import {Link} from 'react-router-dom'
import'../styles/profile.css' 
import Logout from '../components/Logout'

export default function Profile (){
    
    const [user, setUser] = React.useState(null)

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch('http://localhost:5000/user/me', {
                credentials:'include'
                })

                if (res.status === 401) {
                    setUser(null)
                    return
                }

                const data = await res.json()
                setUser(data)

        } catch (error) {
             console.error(error)
             setUser(null)   
            }            
        }
        fetchUser()
    },[])

    if(!user){
        return(
            <>
                <p>Please go to <Link to='/login' className='link'>Login</Link></p>
            </>
        )
    }
    return (
        <>
            <h1>🍰 Welcome back, {user.name}!</h1>
            <p> We're so happy to see you again. <br />
                From your <Link to='/choose' className='link'>favorite bakes</Link> to custom-made creations – your sweet journey starts here.
                Check your past orders, manage your info, or get in touch to design your next perfect cake. <br/>

                Let’s bake some joy together!      
            </p>
            <button>My previous Order</button>
            <button>Edit Profile</button>
            <Link to='/contact'><button>Contact Me</button></Link>
            <Logout />

            
        </>
    )
}
